/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  function createTweetElement (tweetObject) {
    var $tweet = $("<article>").addClass("tweet");
    var $header = $("<header>");
    var $img = $("<img>").addClass("profilePic").attr("src", tweetObject.user.avatars.small);
    var $name = $("<span>").addClass("name").html(tweetObject.user.name);
    var $handle = $("<span>").addClass("handle").html(tweetObject.user.handle);
    var $tweetContent = $("<main>").addClass("tweetContent").html(tweetObject.content.text);
    var formattedDate = new Date(1*tweetObject.created_at);
    var $footerContent = $("<span>").addClass("footer").html(formattedDate.toUTCString());

    // var $footerIcons = $("<footer>").addClass("<i>");**FIX THIS****

    var $footer = $("<footer>").append($footerContent)

    $header.append($img);
    $header.append($name);
    $header.append($handle);
    $tweet.append($header);
    $tweet.append($tweetContent);
    $tweet.append($footer);

    return $tweet;
  }

// Fake data taken from tweets.json
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function renderTweets(array) {
  for( var i in array ) {
  var $newTweet = createTweetElement(array[i]);
  $("#feed").append($newTweet);
  }
}

renderTweets(data);

});