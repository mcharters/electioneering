from pymongo import MongoClient
import csv

client = MongoClient('localhost', 3001)

db = client.meteor
addresses = db.addresses

def documents(reader):
    for row in reader:
        if row['WARD'] != '5':
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
