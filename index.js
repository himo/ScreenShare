"user strict";
let localStream;
const peer = new Peer({
  key: 'c2ad39ff-ed02-41e1-b1f1-c918871c1f28',
  debug: 3
});

peer.on('open', () => {
  document.getElementById('my-id').textContent = peer.id;
});


const mediaStreamConstraints = {
  audio: true,
  video: {"frameRate": {"max": 60}} 
};

document.getElementById('start').onclick = function() {
  navigator.mediaDevices
  .getDisplayMedia(mediaStreamConstraints)
  .then(gotLocalMediaStream)
  .catch(handleLocalMediaStreamError);
}

const localVideo = document.querySelector("video");

function gotLocalMediaStream(mediaStream) {
  localStream = mediaStream;
  localVideo.srcObject = mediaStream;
}

function handleLocalMediaStreamError(error) {
  console.log("navigator.getUserMedia error: ", error);
}
