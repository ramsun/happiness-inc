from flask import Flask, render_template, request, jsonify, send_from_directory
from scraper import scrape_news
import pymongo, csv, json, random, os

app = Flask(__name__)
app._static_folder = '/Users/richard/Desktop/Happiness Inc Branch/templates/static'

cwd = os.getcwd()
'''
Code to show navigation.
cwd = os.getcwd()  # Get the current working directory (cwd)
files = os.listdir(cwd+"/Desktop/Site/resources")  # Get all the files in that directory
print("Files in '%s': %s" % (cwd+"/Desktop/Site/templates/static/resources/", files))
'''


@app.route('/',methods=["GET", "POST"])
def process():
	if request.method == 'POST':
		data = request.json
		articles = scrape_news(data['name'])
		data['name']=articles
		#print(articles)
		return jsonify(data)
	return render_template("index.html")

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
    path = cwd+"/Desktop/Happiness Inc Branch/resources/2015-2017_data.csv"
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
                    "Happiness Rank" : float(aRow[2]),
                    "Happiness Score" : float(aRow[3]),
                    "Economy (GDP per Capita)" : float(aRow[4]),
                    "Family" : float(aRow[5]),
                    "Health (Life Expectancy)" : float(aRow[6]),
                    "Freedom" : float(aRow[7]),
                    "Trust (Government Corruption)" : float(aRow[8]),
                    "Generosity" : float(aRow[9]),
                    "Dystopia Residual" : float(aRow[10]),
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

# Shows metadata for a querried year
# Raw data includes years from 2015-2017
@app.route("/data/<year>.json")
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

if __name__ == "__main__":
	app.run(debug=True)