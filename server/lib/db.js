"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = 'mongodb://heroku_k4vqt6mc:fvi8ha1duc2db66kpbelibjqn6@ds031597.mlab.com:31597/heroku_k4vqt6mc';

// const MONGODB_URI = "mongodb://127.0.0.1:27017/tweeter";
let collection;

  const Tweets = {
    saveTweet: (tweet, cb) => {
      collection.insert(tweet);
      return true;
    },

    getTweets: (cb) => {
      collection.find().toArray((err, results) => {
        cb(results.sort(function(a, b) {
          return a.created_at - b.created_at;
        }))
      })
    }
  }

module.exports = {
  connect: (callback) => {

    MongoClient.connect(MONGODB_URI, (err, db) => {
    if(err !== null) {
      console.log(err);
     } else {
      collection = db.collection("tweets")
      callback(Tweets);
    }
    });
  }
}
