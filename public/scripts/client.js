/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  console.log("client js ready!");

  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
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
  };

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

  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $("#tweets-container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});

// $("#tweet-content").html("Tweet content");
