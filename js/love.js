function toggleOverview(e) {
  if (e.progress === 45 && e.fragmentIndex === 2) {
    setTimeout(function () {
        Flowtime.showOverview(true, true)
    }, 2000)

  }
}

Flowtime.showProgress(true);
Flowtime.enableNavigation(false, false, false, false)
Flowtime.addEventListener("flowtimenavigation", toggleOverview, false)
Flowtime.start();
Flowtime.autoplay(true, 1050)
Flowtime.pause()
var stopFlag = true
$(function() {
    var bgmMusic = document.getElementById("bgmMusic");
    bgmMusic.pause()
    $("#on").click(function() {
        bgmMusic.pause();
        $("#on").hide(200);
        $("#off").css({ "display": "inline-block" }, 300);
    });
    $("#off").click(function() {
        bgmMusic.play();
        $("#off").hide(200);
        $("#on").css({ "display": "inline-block" }, 300);
    });

    $(document).keydown(function (event) {
      if (event.keyCode === 32) {
        $("#cover").hide()
        if (stopFlag) {
          $("#off").click()
          Flowtime.play();
          stopFlag = false;
        }
        else {
          $("#on").click()
          Flowtime.pause()
          stopFlag = true
        }
      }
    })
});
