var videoSeletor;
var videoContainerSelector;

var urlHost = window.location.host;

if (urlHost.indexOf("youku") > -1) {
    videoSeletor = "#ykPlayer video";
    videoContainerSelector = "#ykPlayer .youku-film-player";
} else if (urlHost.indexOf("iqiyi") > -1) {
    videoSeletor = "#flashbox video";
    videoContainerSelector = "#flashbox .pw-video";
}

var $video = document.querySelector(videoSeletor);

var container = document.createElement("DIV");
container.style.position = "absolute";
container.style.top = 0;
container.style.right = 0;
container.style.opacity = 0.7;
container.style.zIndex = 99999;
container.className = "ynk-playback-control";

var downBtn = document.createElement("BUTTON");
downBtn.appendChild(document.createTextNode("<<"));
downBtn.addEventListener("click", function () {
    $video.playbackRate -= 0.25;
    updateRate();
})

var rateBtn = document.createElement("BUTTON");
rateBtn.style.width = "40px";
rateBtn.appendChild(document.createTextNode("Rate"));
rateBtn.addEventListener("click", function () {
    $video.playbackRate = 1;
    updateRate();
})

var upBtn = document.createElement("BUTTON");
upBtn.appendChild(document.createTextNode(">>"));
upBtn.addEventListener("click", function () {
    $video.playbackRate += 0.25;
    updateRate();
})

function updateRate() {
    rateBtn.innerHTML = $video.playbackRate;
}

container.appendChild(downBtn);
container.appendChild(rateBtn);
container.appendChild(upBtn);

function youkuVideoElementInserted(e) {
    console.log(e.target.nodeName);
    if (e.target.nodeName === "VIDEO") {
        document.body.querySelector(videoContainerSelector).appendChild(container);
        updateRate();
        document.querySelector("#ykPlayer").removeEventListener("DOMNodeInserted", youkuVideoElementInserted)
    }
}
if (document.body.querySelector(videoContainerSelector)) {
    document.body.querySelector(videoContainerSelector).appendChild(container);
    updateRate();
} else {
    $("#ykPlayer").on("DOMNodeInserted", function (e) {
        if (e.target.nodeName === "VIDEO") {
            $video = document.querySelector(videoSeletor);
            document.body.querySelector(videoContainerSelector).appendChild(container);
            updateRate();
        }
    })
}

