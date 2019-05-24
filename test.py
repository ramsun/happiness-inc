import csv
import pymongo

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db = client.happiness_db

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

    # loop through the csv container and perform analysis
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

# initialize the database

# Query for a collection based on the year
listings = db.year2015.find()


year = 2015
if year == 2015:
    cursor = db.year2015.find()
    data = []
    for document in cursor:
        data.append(document)
    print(data[1])
    # return jsonify(data)
elif year == 2016:
    data = db.year2016.find()
    print(data[1])
    # return jsonify(data)
elif year == 2017:
    data = db.year2017.find()
    # return jsonify(data)
# # return a jsonified 
# if year == "2015":
#     return jsonify()
# elif year == "2016":
#     return
# elif year == "2017":
#     return 
