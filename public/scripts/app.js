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
    var $footer = $("<footer>").append($footerContent);


    $header.append($img);
    $header.append($name);
    $header.append($handle);
    $tweet.append($header);
    $tweet.append($tweetContent);
    $tweet.append($footer);

    return $tweet;
  }
  var arr = createTweetElement(testTweet);
  $("#feed").append(arr);
});

var testTweet = {
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
};

