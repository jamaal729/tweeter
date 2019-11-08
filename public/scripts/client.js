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

    console.log("data: ", data);
    let tweetArr = [];
    console.log(typeof tweets);
    for (let tweet of tweets) {
      tweetArr.push(tweet);
    }
    tweetArr = tweetArr.reverse();

    console.log("tweets: ", tweets);
    for (let tweet of tweetArr) {
      let tweetHtml = createTweetElement(tweet);
      $("#tweets-container").append(tweetHtml);
    }
  };

  // start with empty tweets
  const data = [];

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

  // Post new tweets
  const newTweets = function() {
    $("form").on("submit", function(event) {
      const tweetContent = $(".new-tweet textarea").serialize();
      // alert("tweet content: ", tweetContent);

      // if (validContent(tweetContent)) {
      //   alert("invalid content");
      // } else {}

      console.log("submitted tweet?");
      console.log("data: ", data);
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

  // Check for valid tweet
  const validContent = function(tweetContent) {
    alert("inside validation: ", tweetContent);
    if (!tweetContent || tweetContent.length > 140) {
      return false;
    } else {
      return true;
    }
  };

  newTweets();
  loadTweets();

  $("#tweets-toggle").click(function() {
    $("#newtweet").slideToggle(300, function() {});
  });
});
