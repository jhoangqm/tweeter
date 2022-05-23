let charLimit = 140;
$(function () {
  // DOM LOADED SUCCESFULL

  $('.new-tweet form textarea').on('input', function () {
    $(this).val((i, value) => {
      charLimit = 140 - value.length;
      const counter = $(this).siblings().find('.counter');
      if (charLimit < 0) {
        counter.addClass('tweetTooLong');
      } else {
        counter.removeClass('tweetTooLong');
      }
      counter.text(charLimit);
      return value;
    });
  });
});
