/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function () {
  $('.new-tweet').hide();
  $('nav div i').on('click', () => {
    $('.new-tweet').slideToggle();
    $('#tweet-text').focus();
  });

  // function that creates new tweet
  const createTweetElement = function (tweetObj) {
    // Escape function to prevent cross site scripting
    const escape = function (string) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(string));
      return div.innerHTML;
    };

    const $newTweet = $('<article>').addClass('tweet');

    // HTML template
    const innerHTML = `
          <header>
            <div class="profile">
              <img src=${tweetObj.user.avatars}>
              <h4><span class="normal">${tweetObj.user.name}</span></h4>
            </div>
            <div>
              <h4 class="handle">${tweetObj.user.handle}</h4>
            </div>
          </header>
          <h5 class="tweet-text">
            ${escape(tweetObj.content.text)}
          </h5>
          <hr>
          <footer>
            <div class="date">
              <p><strong>${timeago.format(tweetObj.created_at)}</strong></p>
            </div>
            <div class="icons">
              <i class="fa-solid fa-flag fa-2xs"></i>
              <i class="fa-solid fa-retweet fa-2xs"></i>
              <i class="fa-solid fa-heart fa-2xs"></i>
            </div>
          </footer>
      </section>
      `;

    const newTweet = $newTweet.append(innerHTML);
    return newTweet;
  };
  // function that render the created tweets from db
  const renderTweets = function (tweetDatas) {
    for (const tweet of tweetDatas) {
      const $tweet = createTweetElement(tweet);
      $('.tweets').prepend($tweet);
    }
  };

  // function that load tweets from db
  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (tweetDatas) {
        renderTweets(tweetDatas);
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  // function that loads the latest tweet
  const loadLatestTweets = function () {
    $.ajax('/tweets', { method: 'GET' }).then(function (tweetDatas) {
      renderTweets([tweetDatas[tweetDatas.length - 1]]);
    });
  };

  // function that takes in text checks validation if good it sends data to the server.
  const newTweetPost = function (event) {
    event.preventDefault();
    const tweeted = $(this).serialize();
    const counter = $('.counter');
    const error = $('.error');
    error.slideUp();
    if (counter.hasClass('deepRed')) {
      error.text('⚠️  Your tweet is currently too long. ⚠️ ');
    } else if (tweeted === 'text=') {
      error.text('⚠️  All tweets must contain at least one character. ⚠️ ');
      error.slideDown();
    } else {
      $.ajax({ url: '/tweets', method: 'POST', data: tweeted })
        .then(function (req) {
          loadLatestTweets();
          counter.text(140);
        })
        .catch(function (e) {
          console.log(e);
        });
      $('#new-tweet-form').trigger('reset');
    }
  };

  //calls the newtweetpost function upon submitting
  $('#new-tweet-form').submit(newTweetPost);

  loadTweets();
});
