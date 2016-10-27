/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $('.new-tweet').hide();
  function createTweetElement (tweetObject) {
    let $tweet = $("<article>").addClass("tweet");
    let $header = $("<header>");
    let $img = $("<img>").addClass("profilePic").attr("src", tweetObject.user.avatars.small);
    let $name = $("<span>").addClass("name").html(tweetObject.user.name);
    let $handle = $("<span>").addClass("handle").html(tweetObject.user.handle);
    let $tweetContent = $("<main>").addClass("tweetContent").html(tweetObject.content.text);
    let formattedDate = new Date(tweetObject.created_at);
    let $footerContent = $("<span>").addClass("footer").html(moment(formattedDate).fromNow());
    let $footerIcons = $('<i class="fa fa-retweet" aria-hidden="true"></i><i class="fa fa-flag" aria-hidden="true"></i><i class="fa fa-heart" aria-hidden="true"></i>');
    let $footer = $("<footer>").append($footerContent).append($footerIcons);

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
    let text = $("#tweet-area").val();
    if (text.trim().length == 0) {
     $("#errors").text("Cat got your fingers?").fadeIn().delay(1000).fadeOut();
    } else if (text.length > 140) {
     $("#errors").text("Reel it in, Sailor.").fadeIn().delay(1000).fadeOut();
    } else {
      let tweetSubmit = $.ajax({
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

  function loadTweets(loadAll) {
     $.ajax({
        method: 'GET',
        url: '/tweets',
        data: $(this).serialize(),
        dataType: 'json'
      }).done(function (data) {
       if(loadAll){
        renderTweets(data);
      } else {
      $('#feed').prepend(createTweetElement(data[data.length - 1]));
      }
    });
   };
   loadTweets(true);

// Renders tweets and prepends them to the top of feed.
  function renderTweets(array) {
    for( let i in array ) {
      let $newTweet = createTweetElement(array[i]);
      $("#feed").prepend($newTweet);
    }
  };

});
