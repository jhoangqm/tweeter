/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
// const data = [
//   {
//     user: {
//       name: 'Chamath Palihapithya',
//       avatars: '/images/chamath.jpeg',
//       handle: '@GSW_MajorShareHolder',
//     },
//     content: {
//       text: '$SPCE, $CLOV. Invest in my tickers!',
//     },
//     created_at: 14611162327,
//   },
//   {
//     user: {
//       name: 'Newton',
//       avatars: 'https://i.imgur.com/73hZDYK.png',
//       handle: '@SirIsaac',
//     },
//     content: {
//       text: 'If I have seen further it is by standing on the shoulders of giants',
//     },
//     created_at: 14611162327,
//   },
//   {
//     user: {
//       name: 'Descartes',
//       avatars: 'https://i.imgur.com/nlhLi3I.png',
//       handle: '@rd',
//     },
//     content: {
//       text: 'Je pense , donc je suis',
//     },
//     created_at: 14611139588,
//   },
// ];

$(function () {
  const createTweetElement = function (tweetObj) {
    const $newTweet = $('<article>').addClass('tweet');
    const day = tweetDate(tweetObj['created_at']);

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
              <p><strong>${day} days ago </strong></p>
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

  const tweetDate = function (tweetTime) {
    const currentDateTime = new Date().getTime();
    const milliseconds = 86400000000;

    const timeDifference = currentDateTime - tweetTime;
    const dayDifference = timeDifference / milliseconds;

    return Math.floor(dayDifference);
  };

  const renderTweets = function (tweetDatas) {
    for (const tweet of tweetDatas) {
      const $tweet = createTweetElement(tweet);
      $('.tweets').append($tweet);
    }
  };

  // renderTweets(data);

  $('#new-tweet-form').submit(function (event) {
    event.preventDefault();
    const $form = $(this);
    const tweeted = $form.serialize();
    // $.ajax({ url: '/tweets/', method: 'POST', data: tweeted });
  });
});
