# Import dependencies
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
import pymongo
import csv
import json


# Initialize flask app
app = Flask(__name__)


#################################################
# Database Setup
#################################################
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db = client.happiness_db


#################################################
# Helper functions
#################################################
# Scrapes the raw data from a csv and stores them in collections
def init_happiness_raw_data():
    # Initialize the database collection objects
    collection_2015 = db.year2015
    collection_2016 = db.year2016
    collection_2017 = db.year2017

    # Drop the databases so that data does not repeat
    db.drop_collection(collection_2015)
    db.drop_collection(collection_2016)
    db.drop_collection(collection_2017)

    # Open the raw data csv file
    path = "resources/2015-2017_data.csv"
    with open(path, newline ='') as casfileH:
        # assign the csv to a container object
        csvContainer = csv.reader(casfileH, delimiter = ',')

        # loop through the csv container and push to the collection
        for aRow in csvContainer:
            # Skip the header row
            if aRow[0] == "Country":
                continue

            # Store the current rows data in a dictionary
            row_dict = { 
                    "Country" : aRow[0], 
                    "Happiness Rank" : aRow[2],
                    "Happiness Score" : aRow[3],
                    "Economy (GDP per Capita)" : aRow[4],
                    "Family" : aRow[5],
                    "Health (Life Expectancy)" : aRow[6],
                    "Freedom" : aRow[7],
                    "Trust (Government Corruption)" : aRow[8],
                    "Generosity" : aRow[9],
                    "Dystopia Residual" : aRow[10],
                    }
            
            # Push the new entry into the respective mongo collection
            if aRow[1] == "2017":
                collection_2017.insert_one(row_dict)
            elif aRow[1] == "2016":
                collection_2016.insert_one(row_dict)
            elif aRow[1] == "2015":
                collection_2015.insert_one(row_dict)


#################################################
# Flask Routes
#################################################
# define the home route to render index.html
@app.route("/")
def home():
    return render_template("index.html")

# Shows metadata for a querried year
# Raw data includes years from 2015-2017
@app.route("/data/<year>")
def stream_data(year):
    # initialize the database
    init_happiness_raw_data()

    #  Make a query to mongo based on the year provided in the route
    if year == "2015":
        cursor = db.year2015.find()  
    elif year == "2016":
        cursor = db.year2016.find()
    elif year == "2017":
        cursor = db.year2017.find()
    
    # Convert the cursor object to a list of dictionaries 
    data = []
    for document in cursor:
        # pop the _id, since it is an ObjectId class (not serializeable into a json) 
        document.pop("_id")
        data.append(document)
    
    # Return the "data" object as a json
    return jsonify(data)
    
# @app.route("/scrape"):
# def scrape():

  
# Main
if __name__ == "__main__":
    app.run(debug = True)


