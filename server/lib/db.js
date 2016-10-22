"use strict";

const initialTweets = require("./tweets");
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/tweeter";


let collections;

const db = { tweets: initialTweets };

MongoClient.connect(MONGODB_URI, (err, db) => {
 let collections = db.collection("tweets")
});

 const dbMethods = {

   saveTweet: (data) => {
     db.collection.insert(data);
     return true;
   },

   getTweets: (callback) => {
     collections.find().toArray((err, results) => {
       if (err) {
         console.log('Could not connect! Unexpected error. Details below.');
         throw err;
       }
       callback(results.sort(function(a, b) {
         return a.created_at - b.created_at
       }));
     });
   }
}

module.exports = {

 connect: (onConnect) => {

   onConnect(dbMethods);

 }
}