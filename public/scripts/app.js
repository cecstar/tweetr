/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const tweetApi = require('tweets');

$(document).ready(function() {

  $('.new-tweet').hide();
  function createTweetElement (tweetObject) {
    var $tweet = $("<article>").addClass("tweet");
    var $header = $("<header>");
    var $img = $("<img>").addClass("profilePic").attr("src", tweetObject.user.avatars.small);
    var $name = $("<span>").addClass("name").html(tweetObject.user.name);
    var $handle = $("<span>").addClass("handle").html(tweetObject.user.handle);
    var $tweetContent = $("<main>").addClass("tweetContent").html(tweetObject.content.text);
    var formattedDate = new Date(1*tweetObject.created_at);
    var $footerContent = $("<span>").addClass("footer").html(formattedDate.toUTCString());
          //update formattedDate with below code so it shows how long ago tweet created
          //var time = Math.floor((Date.now() - tweobject.created_at)/8.64e+7)


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

  $("#compose-button").on('click', function () {
    $(".new-tweet").slideToggle();
    $("textarea").focus();

  });



  $('form[action="/tweets"]').on('submit', function(event) {
    event.preventDefault();
    var text = $("#tweet-area").val();
    if ( text == "") {
     $("#errors").text("Cat got your fingers?").fadeIn().delay(1000).fadeOut();
    } else if (text.length > 140) {
     $("#errors").text("Reel it in, Sailor.").fadeIn().delay(1000).fadeOut();
    } else {
      var tweetSubmit = $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $(this).serialize(),
      dataType: 'json'
    });
    $('#tweet-area').val("");
    $('.counter').text(140);
    loadTweets();
   };
  });

  function loadTweets() {
     var allTheTweets = $.ajax({
        method: 'GET',
        url: '/tweets',
        data: $(this).serialize(),
        dataType: 'json'
      });
    allTheTweets.done(function (data) {
      renderTweets(data);
    });
   };
   loadTweets();

  function renderTweets(array) {
    for( var i in array ) {
    var $newTweet = createTweetElement(array[i]);
    $("#feed").prepend($newTweet);
    }
  }

});

