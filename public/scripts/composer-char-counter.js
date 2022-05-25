let charLimit = 140;

$(function () {
  // DOM LOADED SUCCESFULL

  // After the lecture I discovered you can assign the selector to a variable..
  const $tweets = $('.new-tweet form textarea');

  $tweets.on('input', function () {
    $(this).val((i, value) => {
      charLimit = 140 - value.length;
      const counter = $(this).parent().find('.counter');
      if (charLimit < 0) {
        counter.addClass('deepRed');
      } else {
        counter.removeClass('deepRed');
      }
      counter.text(charLimit);
      return value;
    });
  });
});
