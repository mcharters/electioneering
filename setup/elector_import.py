from pymongo import MongoClient, InsertOne, UpdateOne
import csv
import argparse
import datetime

parser = argparse.ArgumentParser(description="Populate the electioneering database with candidate's electoral data")
parser.add_argument('--production', dest='production', action='store_true')
parser.add_argument('--file', dest='fname', action='store')
parser.set_defaults(production=False)

args = parser.parse_args()

mongoPort = 3001
if args.production:
    mongoPort = 27017

client = MongoClient('localhost', mongoPort)

db = client.meteor
addresses = db.addresses
people = db.people

with open(args.fname) as csvfile:
    reader = csv.DictReader(csvfile)
    addressWrites = []
    peopleWrites = []

    for row in reader:
        address = addresses.find_one({'address': row['Property Address'].strip()})

        if address is None:
            continue

        if address.get('poll') is None:
            addressWrites.append(UpdateOne({'_id': address['_id']}, {'$set': {'poll': row['Poll']}}))

        person = people.find_one({
            'addressId': address['_id'],
            'name': row['Name']
        })

        rowVoted = row['Voted'] == 'Y'
        if person is None:
            peopleWrites.append(InsertOne({
                'name': row['Name'],
                'addressId': address['_id'],
                'voted': rowVoted,
                'created': datetime.datetime.utcnow(),
                'updated': datetime.datetime.utcnow()
            }))
        else:
            voted = person.get('Voted')
            if voted is None or voted != rowVoted:
                peopleWrites.append(UpdateOne({'_id': person['_id']}, {'$set': {'voted': rowVoted, 'updated': datetime.datetime.utcnow()}}))

    if len(addressWrites) > 0:
        addresses.bulk_write(addressWrites)

    if len(peopleWrites) > 0:
        people.bulk_write(peopleWrites)
