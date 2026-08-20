(function () {
  'use strict';

  function nextSettlementTime(now) {
    var target = new Date(now.getTime());
    target.setUTCMinutes(0, 0, 0);
    target.setUTCHours(Math.floor(now.getUTCHours() / 6) * 6 + 6);
    return target;
  }

  var settlementAt = nextSettlementTime(new Date());

  function twoDigits(value) {
    return value < 10 ? '0' + value : String(value);
  }

  function updateCountdown() {
    var now = new Date();
    if (now.getTime() >= settlementAt.getTime()) settlementAt = nextSettlementTime(now);
    var secondsLeft = Math.max(0, Math.floor((settlementAt.getTime() - now.getTime()) / 1000));
    var hours = twoDigits(Math.floor(secondsLeft / 3600));
    var minutes = twoDigits(Math.floor((secondsLeft % 3600) / 60));
    var seconds = twoDigits(secondsLeft % 60);
    var display = hours + ':' + minutes + ':' + seconds;
    var main = document.getElementById('countdown');
    var panel = document.getElementById('dialog-countdown');
    if (main) main.textContent = display;
    if (panel) panel.textContent = display;
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
}());
