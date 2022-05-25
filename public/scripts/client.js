/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function () {
  const createTweetElement = function (tweetObj) {
    const $newTweet = $('<article>').addClass('tweet');

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
            ${tweetObj.content.text}
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

  const renderTweets = function (tweetDatas) {
    for (const tweet of tweetDatas) {
      const $tweet = createTweetElement(tweet);
      $('.tweets').prepend($tweet);
    }
  };

  // renderTweets(data);

  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' }).then(function (tweetDatas) {
      renderTweets(tweetDatas);
    });
  };

  loadTweets();

  const newTweetPost = function (event) {
    event.preventDefault();
    const $form = $(this);
    const tweeted = $form.serialize();
    console.log(tweeted);
    if (tweeted.length > 141) {
      alert('Characters exceeded');
    } else if (tweeted === 'text=') {
      alert('Please enter a message');
    } else {
      $.ajax({ url: '/tweets/', method: 'POST', data: tweeted }).then(function (
        req
      ) {
        console.log(req);
      });
    }
  };
  $('#new-tweet-form').submit(newTweetPost);
});
