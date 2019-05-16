# Import dependencies
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from flask_pymongo import PyMongo

# Initialize flask app
app = Flask(__name__)

#################################################
# Database Setup
#################################################
app.config["MONGO_URI"] = "mongodb://localhost:27017/happiness_app"
mongo = PyMongo(app)


# Main
if __name__ == "__main__":
    app.run()
