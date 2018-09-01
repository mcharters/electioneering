from pymongo import MongoClient, GEOSPHERE, TEXT
import csv
import argparse

parser = argparse.ArgumentParser(description="Populate the electioneering database with open data")
parser.add_argument('--production', dest='production', action='store_true')
parser.add_arugment('--ward', dest='ward', action='store')
parser.set_defaults(production=False)

args = parser.parse_args()

if not args.ward:
    exit("Please specify a ward!")

mongoPort = 3001
if args.production:
    mongoPort = 27017

client = MongoClient('localhost', mongoPort)

db = client.meteor
addresses = db.addresses

def documents(reader):
    for row in reader:
        if row['WARD'] != args.ward:
            continue

        yield {
            'street': row['STREET_NM'],
            'address': row['CIVIC_ADDR'],
            'location': {
                'type': 'Point',
                'coordinates': [float(row['LONGITUDE']), float(row['LATITUDE'])]
            }
        }

with open('./Addresses.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    addresses.insert_many(documents(reader))

    # create indices
    addresses.create_index([('address', TEXT)])
    addresses.create_index([('location', GEOSPHERE)])
