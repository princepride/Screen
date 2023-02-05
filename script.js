const videoElem = document.getElementById("video");
//const logElem = document.getElementById("log");
const turnOnElem = document.getElementById("camera");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");

// Options for getDisplayMedia()

var displayMediaOptions = {
    video: {
        cursor: "never"
    },
    audio: false
};

// Set event listeners for the start and stop buttons
startElem.addEventListener("click", function (evt) {
    startCapture();
}, false);

turnOnElem.addEventListener("click", function (evt) {
    turnOn();
});

stopElem.addEventListener("click", function (evt) {
    stopCapture();
}, false); 

async function startCapture() {
    try {
        videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        //dumpOptionsInfo();
    } catch (err) {
        console.error("Error: " + err);
    }
} 

function turnOn() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
    }).then(stream => {
        videoElem.srcObject = stream;
    }).catch(console.error)
}

function stopCapture(evt) {
    let tracks = videoElem.srcObject.getTracks();

    tracks.forEach(track => track.stop());
    videoElem.srcObject = null;
} 


//console.log = msg => logElem.innerHTML += `${msg}<br>`;
//console.error = msg => logElem.innerHTML += `<span class="error">${msg}</span><br>`;
//console.warn = msg => logElem.innerHTML += `<span class="warn">${msg}<span><br>`;
//console.info = msg => logElem.innerHTML += `<span class="info">${msg}</span><br>`;
//function dumpOptionsInfo() {
//    const videoTrack = videoElem.srcObject.getVideoTracks()[0];

//    console.info("Track settings:");
//    console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
//    console.info("Track constraints:");
//    console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
//}

//$(document).ready(function () {
//    document.getElementById("start").click();
//    function triggerClick() {
//        var event = new MouseEvent('click', {
//            'view': window,
//            'bubbles': true,
//            'cancelable': true
//        });
//        var cb = document.querySelector('input[type=submit][name=btnK]');
//        var canceled = !cb.dispatchEvent(event);
//        if (canceled) {
//            // preventDefault was called and the event cancelled
//        } else {
//            // insert your event-logic here...
//        }
//    }
//});