// scroll up button

$(function () {
  $(window).scroll(function () {
    const $upBtn = $('.up-btn');
    const $newTweetbtn = $('.new-tweet-btn');

    if ($(this).scrollTop()) {
      $upBtn.removeClass('hidden');
    } else {
      $upBtn.addClass('hidden');
    }

    $upBtn.on('click', function () {
      $(window).scrollTop(0);
      $('.new-tweet').slideDown();
      $('#tweet-text').focus();
      $(this).addClass('hidden');
    });

    //for navbar new tweet button
    if ($upBtn.hasClass('hidden')) {
      $newTweetbtn.removeClass('hidden');
    } else {
      $newTweetbtn.addClass('hidden');
    }
  });
});
