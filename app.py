# Import dependencies
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from flask_pymongo import PyMongo

# @TODO How are we going to create the pipelines for out data?
#  pipelines will be defined by flask routes

# Initialize flask app
app = Flask(__name__)

#################################################
# Database Setup
#################################################
app.config["MONGO_URI"] = "mongodb://localhost:27017/happiness_app"
mongo = PyMongo(app)

# define the home route to render index.html
@app.route("/")
def home():
    return render_template("index.html")

# restful api
@app.route("/scrape", methods = ['GET', 'POST'])

# Main
if __name__ == "__main__":
    app.run()
