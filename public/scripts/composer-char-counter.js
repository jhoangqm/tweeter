let charLimit = 140;
$(function () {
  // DOM LOADED SUCCESFULL
  $('.new-tweet form textarea').on('input', function () {
    $(this).val((i, value) => {
      charLimit - value.length;
      let theCounter = $(this).siblings('.counter');
      if (charLimit < 0) {
        theCounter.addClass('tweetTooLong');
      } else {
        theCounter.removeClass('tweetTooLong');
      }
      theCounter.text(charLimit);
      return value;
    });
  });
});
