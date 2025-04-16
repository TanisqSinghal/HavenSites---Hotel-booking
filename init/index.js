const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js'); 

const MONGO_URL = 'mongodb://localhost:27017/HavenSites';

main()
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('MongoDB connection error:', err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: '67fd25f8d23c827980d7fc1d'}));
    await Listing.insertMany(initData.data);
    console.log('Database initialized with sample data.');
};

initDB();