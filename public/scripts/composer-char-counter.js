$(document).ready(function (){
  $('.new-tweet form textarea').on('keypress', function(){
    var countLength = $(this).val().length;
    var characterCount = (140 - countLength);
    $(this).parent().find('.counter').text(characterCount);

    if (characterCount < 0) {
        $(this).parent().find('.counter').addClass("exceeds-limit");
    }
  });
});
