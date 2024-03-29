"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _getBlobDuration = _interopRequireDefault(require("get-blob-duration"));

var videoContainer = document.getElementById("jsVideoPlayer");
var videoPlayer = document.querySelector("#jsVideoPlayer video");
var playBtn = document.getElementById("jsPlayButton");
var volumeBtn = document.getElementById("jsVolumeBtn");
var scrnBtn = document.getElementById("jsFullScreen");
var currentTime = document.getElementById("currentTime");
var totalTime = document.getElementById("totalTime");
var volumeRange = document.getElementById("jsVolume");

var registerView = function registerView() {
  var videoId = window.location.href.split("/videos/")[1];
  fetch("/api/".concat(videoId, "/view"), {
    method: "POST"
  });
};

function setTotalTime() {
  return _setTotalTime.apply(this, arguments);
}

function _setTotalTime() {
  _setTotalTime = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var blob, duration, totalTimeString;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(videoPlayer.src).then(function (response) {
              return response.blob();
            });

          case 2:
            blob = _context.sent;
            _context.next = 5;
            return (0, _getBlobDuration["default"])(blob);

          case 5:
            duration = _context.sent;
            console.log(duration);
            totalTimeString = formatDate(duration);
            totalTime.innerHTML = totalTimeString;
            setTimeout(getCurrentTime, 1000);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _setTotalTime.apply(this, arguments);
}

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = "<i class=\"fas fa-pause\"></i>";
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = "<i class=\"fas fa-play\"></i>";
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = "<i class=\"fas fa-volume-up\"></i>";
    volumeRange.value = videoPlayer.volume;
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = "<i class=\"fas fa-volume-mute\"></i>";
    volumeRange.value = 0;
  }
}

function goFullScreen() {
  videoContainer.requestFullscreen();
  scrnBtn.innerHTML = "<i class=\"fas fa-compress\"></i>";
  scrnBtn.removeEventListener("click", goFullScreen);
  scrnBtn.addEventListener("click", goSmallScreen);
}

function goSmallScreen() {
  document.exitFullscreen();
  scrnBtn.innerHTML = "<i class=\"fas fa-expand\"></i>";
  scrnBtn.removeEventListener("click", goSmallScreen);
  scrnBtn.addEventListener("click", goFullScreen);
}

var formatDate = function formatDate(seconds) {
  var secondsNumber = parseInt(seconds, 10);
  var hours = Math.floor(secondsNumber / 3600);
  var minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  var totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0".concat(hours);
  }

  if (minutes < 10) {
    minutes = "0".concat(minutes);
  }

  if (seconds < 10) {
    totalSeconds = "0".concat(totalSeconds);
  }

  return "".concat(hours, ":").concat(minutes, ":").concat(totalSeconds);
};

function getCurrentTime() {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
}

function handeleEnded() {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = "<i class=\"fas fa-play\"></i>";
}

function handleDrag(event) {
  var value = event.target.value;
  videoPlayer.volume = value;

  if (value >= 0.8) {
    volumeBtn.innerHTML = "<i class=\"fas fa-volume-up\"></i>";
  } else if (value >= 0.4) {
    volumeBtn.innerHTML = "<i class=\"fas fa-volume-down\"></i>";
  } else {
    volumeBtn.innerHTML = "<i class=\"fas fa-volume-off\"></i>";
  }
}

function init() {
  videoPlayer.volume = 0.5;
  videoPlayer.currentTime = 380;
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  scrnBtn.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handeleEnded);
  volumeRange.addEventListener("input", handleDrag);
}

if (videoContainer) init();