const mongoClient = require('mongodb').MongoClient;

const dbUrl = 'mongodb://localhost:27017/Fitness';

mongoClient.connect(dbUrl)
  .then(client => {
    console.log("Connected to MongoDB!");
    //const db = client.db(); // get the reference to the database
    // Your code here to interact with the database
  })
  .catch(err => console.error("Error connecting to MongoDB:", err));

module.exports = mongoClient;
