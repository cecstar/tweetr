$(document).ready(function (){
  $('.new-tweet form textarea').on('keypress', function(){
    var counter = $(this).val().length;
    var countChar = (140 - counter);
    $(".counter").text(countChar);
    console.log(countChar);
  });
});