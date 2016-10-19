$(document).ready(function (){
  $('.new-tweet form textarea').on('keydown', function(){
    var countLength = $(this).val().length;
    var characterCount = (140 - countLength);
    var counter = $(this).parent().find('.counter');

    counter.text(characterCount);

    if (characterCount < 0) {
        counter.addClass("exceedsLimit");
    } else {
      counter.removeClass("exceedsLimit");
    }
  });
});
