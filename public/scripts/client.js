/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function () {
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
    $.ajax('/tweets', { method: 'GET' }).then(function (tweetDatas) {
      renderTweets(tweetDatas);
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
    const $form = $(this);
    const tweeted = $form.serialize();
    const counter = $('.counter');
    if (tweeted.length > 145) {
      alert('Characters exceeded');
    } else if (tweeted === 'text=') {
      alert('Please enter a message');
    } else {
      $.ajax({ url: '/tweets', method: 'POST', data: tweeted }).then(function (
        req
      ) {
        loadLatestTweets();
        counter.text(140);
      });
    }
  };

  //calls the newtweetpost function upon submitting
  $('#new-tweet-form').submit(newTweetPost);

  loadTweets();
});
