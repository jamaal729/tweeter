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

    count <= 140
      ? $(".counter").css({ color: "black" })
      : $(".counter").css({ color: "red" });

    //  console.log($(this).parent().children("span.counter").innerText);
  });
});
