from flask import Flask, redirect, render_template, url_for, jsonify, request
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_limiter.errors import RateLimitExceeded
from pymongo import MongoClient
import os
from bson.json_util import dumps
from dotenv import load_dotenv
from uuid import uuid4
import time
from waitress import serve
load_dotenv()

mongoapp = MongoClient(os.environ.get("clienturl"))
database = mongoapp["mdas_assessment"]
collection = database["records"]
blacklist_collection = database["blacklist"]

app = Flask(__name__)
limiter = Limiter(
    get_remote_address,
    app=app,
    storage_uri=os.environ.get("clienturl"),
    default_limits=["5040 per day", "360 per hour"]  # Example default limits
)
# app.static_folder = 'templates/'
# app.debug = True

@app.errorhandler(RateLimitExceeded)
def handle_rate_limit_exceeded(e):
    ip = request.headers.get('X-Forwarded-For', '').split(',')[0] if 'X-Forwarded-For' in request.headers else request.remote_addr
    print(f"Rate limit exceeded for IP: {ip}")
    block_ip(ip)
    return f"IP {ip} blacklisted due to forbidden request", 429

@app.route('/rate_limit_exceeded')
def rate_limit_exceeded():
    ip = request.headers.get('X-Forwarded-For', '').split(',')[0] if 'X-Forwarded-For' in request.headers else request.remote_addr
    return f"IP {ip} blacklisted due to forbidden request", 429

@app.before_request
def check_blacklist():
    ip = request.headers.get('X-Forwarded-For', '').split(',')[0] if 'X-Forwarded-For' in request.headers else request.remote_addr
    if is_ip_blacklisted(ip):
        return f"IP {ip} blacklisted due to forbidden request", 403

@app.route("/")
def index():
    ip = request.headers.get('X-Forwarded-For', '').split(',')[0] if 'X-Forwarded-For' in request.headers else request.remote_addr
    if is_ip_blacklisted(ip):
        return f"IP {ip} blacklisted due to forbidden request", 403

    records = []
    for record in collection.find({}):
        temp = 0
        for key, value in record.items():
            if key not in {"_id", "username", "password"}:
                temp += float(value)
        records.append((temp, record))

    sorted_records = sorted(records, key=lambda x: x[0], reverse=True)
    sorted_records = [record for _, record in sorted_records]

    return render_template("index.html", records=sorted_records[:100])


@app.route("/static/index.html")
def static_index():
    return redirect(url_for('index'))

@app.route('/api/data', methods=['POST'])
@limiter.limit("1 per 5 seconds")
def receive_data():
    ip = request.headers.get('X-Forwarded-For', '').split(',')[0] if 'X-Forwarded-For' in request.headers else request.remote_addr
    if is_ip_blacklisted(ip):
        return f"IP {ip} blacklisted due to forbidden request", 403
    
    data = request.json
    # Extract relevant fields for comparison
    username = data.get("username") or f"anonymous-{time.time()}"
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
    

def is_ip_blacklisted(ip):
    return blacklist_collection.find_one({"ip": ip}) is not None

def block_ip(ip):
    if not is_ip_blacklisted(ip):
        blacklist_collection.insert_one({"ip": ip})

if __name__ == "__main__":
    print("application running...")
    serve(app, host='0.0.0.0', port=5000, threads=8)
    # app.run(debug=True) 