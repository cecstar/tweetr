"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/tweeter";

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



// "use strict";

// const User    = require("../lib/user-helper")
// const express = require('express');
// const tweets  = express.Router();

// module.exports = function(Tweets) {
//   tweets.get("/", function(req, res) {
//     let tweets = Tweets.getTweets((value) => {
//       return res.json(value);
//     });
//   });

//   tweets.post("/", function(req, res) {
//     if (!req.body.text) {
//       res.status(400);
//       return res.send("{'error': 'invalid request'}\n");
//     }

//     const user = req.body.user ? req.body.user : User.generateRandomUser();
//     const tweet = {
//       user: user,
//       content: {
//         text: req.body.text
//       },
//       created_at: Date.now()
//     };
//     Tweets.saveTweet(tweet);
//     return res.send();
//   });
//   return tweets;
// }







// "use strict";

// const initialTweets = require("./tweets");
// const MONGODB_URI = "mongodb://127.0.0.1:27017/tweeter";

// const MongoClient = require('mongodb').MongoClient
// const assert = require('assert');

// const db = MongoClient.connect(MONGODB_URI, (err, db) => {
//   assert.equal(null, err);
//   saveTweet: (data) => {
//     db.tweets.push(data);
//     return true;
//   };
// });

//   // console.log("Connected correctly to server");
// const dbMethods = MongoClient.connect(MONGODB_URI, (err, db) => {
//   assert.equal(null, err);
//   getTweets: () => {
//     return db.tweets.sort(function(a, b) {
//       return a.created_at - b.created_at
//     });
//   };
// });

// module.exports = {
//   connect: (onConnect) => {
//     onConnect(dbMethods);
//   }
// }

// // _id