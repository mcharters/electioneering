import { Mongo } from 'meteor/mongo';

const People = new Mongo.Collection('people', { idGeneration: 'MONGO' });

export default People;
