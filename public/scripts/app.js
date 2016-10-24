/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $('.new-tweet').hide();
  function createTweetElement (tweetObject) {
    var $tweet = $("<article>").addClass("tweet");
    var $header = $("<header>");
    var $img = $("<img>").addClass("profilePic").attr("src", tweetObject.user.avatars.small);
    var $name = $("<span>").addClass("name").html(tweetObject.user.name);
    var $handle = $("<span>").addClass("handle").html(tweetObject.user.handle);
    var $tweetContent = $("<main>").addClass("tweetContent").html(tweetObject.content.text);
    var formattedDate = new Date(tweetObject.created_at);
    var $footerContent = $("<span>").addClass("footer").html(moment(formattedDate).fromNow());
    var $footerIcons = $('<i class="fa fa-retweet" aria-hidden="true"></i><i class="fa fa-flag" aria-hidden="true"></i><i class="fa fa-heart" aria-hidden="true"></i>');
    var $footer = $("<footer>").append($footerContent).append($footerIcons);

    $header.append($img).append($name).append($handle);
    $tweet.append($header).append($tweetContent).append($footer);

    return $tweet;
  }

  $(".compose").on('click', function () {
    $(".new-tweet").slideToggle();
    $("textarea").focus();
  });

// Tweet submission form. Counts user's character input, provides err msgs on empty submission or exceeds char limit.
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

// Renders tweets and prepends them to the top of feed.
  function renderTweets(array) {
    for( var i in array ) {
      var $newTweet = createTweetElement(array[i]);
      $("#feed").prepend($newTweet);
    }
  };

});
