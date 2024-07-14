from flask import Flask, redirect, render_template, url_for
# from waitress import serve # type: ignore

app = Flask(__name__)
# app.static_folder = 'templates/'
app.debug = True

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/static/index.html")
def static_index():
    return redirect(url_for('index'))

if __name__ == "__main__":
    # serve(app, host='0.0.0.0', port=5000)
    app.run(debug=True)