"user strict";
let localStream;
var peer;
var ID

/*peer.on('open', () => {
  document.getElementById('my-id').textContent = peer.id;
});*/

const mediaStreamConstraints = {
  audio: {
        noiseSuppression: false,
        autoGainControl: false,
        channelCount: 2
  },
  video: {"frameRate": {"max": 60}} 
};

document.getElementById('start').onclick = function() {
  navigator.mediaDevices
  .getDisplayMedia(mediaStreamConstraints)
  .then(gotLocalMediaStream)
  .catch(handleLocalMediaStreamError);
  ID=getElementById("set-id").value
  document.getElementById('my-id').textContent = peer.id;
  if (ID!=""){
    peer = new Peer(ID,{
      key: 'c2ad39ff-ed02-41e1-b1f1-c918871c1f28',
      debug: 3
    });
  }else{
    peer = new Peer({
      key: 'c2ad39ff-ed02-41e1-b1f1-c918871c1f28',
      debug: 3
    });
  }
  peer.on('call', mediaConnection => {
    mediaConnection.answer(localStream, {videoBandwidth: 14000, audioBandwidth: 4000});
    setEventListener(mediaConnection);
  });
}

document.getElementById('url').onclick = function() {
  navigator.clipboard.writeText("http://150.147.198.206/screen/receive?id="+peer.id);
}

const localVideo = document.querySelector("video");

function gotLocalMediaStream(mediaStream) {
  localStream = mediaStream;
  localVideo.srcObject = mediaStream;
}

function handleLocalMediaStreamError(error) {
  console.log("navigator.getUserMedia error: ", error);
}
