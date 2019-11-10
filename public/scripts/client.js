/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  console.log("client js ready!");
  $(".validation-error").hide();

  // Takes a tweet object and returns a tweet <article> element
  const createTweetElement = function(obj) {
    // console.log(obj.user.name);

    const element = ` 
      <article class="tweet">
        <header>
          <span>
            <img id="avatars" src= ${escape(obj.user.avatars)} ">
            <h3 id="name"> ${escape(obj.user.name)}</h3>
          </span>
          <h3 id="handle"> ${escape(obj.user.handle)}</h3>
        </header>
        <p id="tweet-content"> ${escape(obj.content.text)}</p>
        <footer>
          <p>${obj.created_at}</p>
       </footer>
       </article>  `;
    //  <script>$('body').empty()</script>
    return element;
  };

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    // console.log("data: ", data);
    let tweetArr = [];
    // console.log(typeof tweets);
    for (let tweet of tweets) {
      tweetArr.push(tweet);
    }
    tweetArr = tweetArr.reverse();

    // console.log("tweets: ", tweets);
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
    $("#newtweet").on("submit", function() {
      event.preventDefault();
      console.log($(".new-tweet textarea").val());
      let tweetContent = $(".new-tweet textarea").serialize();
      console.log("tweetContent :", tweetContent);
      if (!validContent(tweetContent)) {
        console.log("invalid content");
        $(".validation-error").slideDown();
      } else {
        $(".validation-error").slideUp();
        console.log("valid content");
        // event.preventDefault();
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
      }
    });
  };

  // Check for valid tweet
  const validContent = function(tweetText) {
    console.log(typeof tweetText);
    tweetText = tweetText.replace("text=", "");
    console.log(tweetText);
    if (
      tweetText === undefined ||
      tweetText === null ||
      tweetText === "" ||
      tweetText.length > 140
    ) {
      return false;
    } else {
      return true;
    }
  };

  loadTweets();
  newTweets();

  $("#tweets-toggle").click(function() {
    $("#newtweet").slideToggle(300, function() {});
  });
});

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const safeHTML = `<p>${escape("<hello>")}</p>`; // delete ------------------
