from flask import Flask, redirect, render_template, url_for, jsonify, request
from pymongo import MongoClient
import os
from bson.json_util import dumps
from dotenv import load_dotenv
from uuid import uuid4

load_dotenv()
from waitress import serve # type: ignore
mongoapp = MongoClient(os.environ.get("clienturl"))
database = mongoapp["mdas_assessment"]
collection = database["records"]

app = Flask(__name__)
# app.static_folder = 'templates/'
app.debug = True

@app.route("/")
def index():
    records = []

    # Calculate sums and store in a list of tuples (sum_value, record)
    for record in collection.find({}):
        temp = 0

        for key, value in record.items():
            if key != "_id" and key != "username" and key != "password":
                temp += float(value)

        records.append((temp, record))  # Store both sum and record

    # Sort records based on the sum_value in descending order
    sorted_records = sorted(records, key=lambda x: x[0], reverse=True)

    # Extract sorted records without sums for rendering
    sorted_records = [record for _, record in sorted_records]

    return render_template("index.html", records=sorted_records[:10])


@app.route("/static/index.html")
def static_index():
    return redirect(url_for('index'))

@app.route('/api/data', methods=['POST'])
def receive_data():
    data = request.json

    # Extract relevant fields for comparison
    username = data.get("username") or "anonymous"
    password = data.get("password") or "default"
    new_data = {key: value for key, value in data.items() if key.startswith("countdown_")}
    
    # Find existing record with the same username and password
    existing_record = collection.find_one({"username": username, "password": password})

    if existing_record:
        # Update existing record
        update_data = {}
        for key, value in new_data.items():
            if key in existing_record:
                existing_value = float(existing_record[key])
                new_value = float(value)
                if new_value > existing_value:
                    update_data[key] = value
            else:
                update_data[key] = value
        
        if update_data:
            # Perform update if there are changes
            collection.update_one(
                {"_id": existing_record["_id"]},
                {"$set": update_data}
            )
            response = {
                "message": "Record updated successfully.",
                "updated_fields": list(update_data.keys()),
                "updated_record": dumps(existing_record)
            }
        else:
            response = {
                "message": "No fields updated. New values are not higher or no new fields introduced.",
                "existing_record": dumps(existing_record)
            }
    else:
        # Insert new record if no existing record found
        data["_id"] = str(uuid4())
        collection.insert_one(data)
        response = {
            "message": "New record inserted successfully.",
            "new_record": dumps(data)
        }

    return jsonify(response)

@app.route('/api/get_records', methods=['GET'])
def get_records():
    try:
        # Fetch records from MongoDB and exclude '_id' and 'password' fields
        records = list(collection.find({}, {'_id': 0, 'password': 0}))
        return jsonify(records)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    serve(app, host='0.0.0.0', port=5000)
    # app.run(debug=True)