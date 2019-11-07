/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  console.log("client js ready!");

  // Takes a tweet object and returns a tweet <article> element
  const createTweetElement = function(obj) {
    console.log(obj.user.name);

    const element = ` 
      <article class="tweet">
        <header>
          <span>
            <img id="avatars" src= ${obj.user.avatars} ">
            <h3 id="name"> ${obj.user.name}</h3>
          </span>
          <h3 id="handle"> ${obj.user.handle}</h3>
        </header>
        <p id="tweet-content"> ${obj.content.text}</p>
        <footer>
          <p>${obj.created_at}</p>
       </footer>
      </article>  `;

    return element;
  };

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    for (let tweet of tweets) {
      let tweetHtml = createTweetElement(tweet);
      $("#tweets-container").append(tweetHtml);
    }
  };

  // Fake data taken from initial-tweets.json
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac"
      },
      content: {
        text:
          "If I have seen further it is by standing on the shoulders of giants"
      },
      created_at: 1461116232227
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd"
      },
      content: {
        text: "Je pense , donc je suis"
      },
      created_at: 1461113959088
    }
  ];

  // renderTweets(data);
  console.log(renderTweets(data));

  // Post new tweets
  const newTweets = function() {
    $("form").on("submit", function(event) {
      console.log("submitted tweet?");
      event.preventDefault();
      $.ajax("/tweets", {
        method: "POST",
        data: $(".new-tweet textarea").serialize(),
        dataType: "text"
      })
        .done(function() {
          console.log("success");
          loadTweets(data);
        })
        .fail(function() {
          console.log("error");
        });
    });
  };

  // Load the tweets
  const loadTweets = function() {
    console.log("loaded tweets?");
    event.preventDefault();
    $.ajax({
      method: "GET",
      url: "/tweets",
      dataType: "json"
    })
      .done(function(data) {
        $("#tweets-container").empty();
        renderTweets(data);
      })
      .fail(function() {
        console.log("error");
      });
  };

  newTweets();
  loadTweets();
});
