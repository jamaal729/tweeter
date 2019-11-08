$(document).ready(() => {
  console.log("composer-char-counter ready!");

  $("#text").keyup(function() {
    let tweetText = this.value;
    let count = tweetText.length;
    // console.log(count);
    $(this)
      .parent()
      .children("span.counter")
      .text(140 - count);

    //  console.log($(this).parent().children("span.counter").innerText);
  });
});
