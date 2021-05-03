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
    console.log(navigator.mediaDevices.getSupportedConstraints())
}

const localVideo = document.querySelector("video");

function gotLocalMediaStream(mediaStream) {
  localStream = mediaStream;
  localVideo.srcObject = mediaStream;
}

function handleLocalMediaStreamError(error) {
  console.log("navigator.getUserMedia error: ", error);
}

document.getElementById('make-call').onclick = () => {
  const theirID = document.getElementById('their-id').value;
  const mediaConnection = peer.call(theirID, localStream);
  setEventListener(mediaConnection);
};

// イベントリスナを設置する関数
const setEventListener = mediaConnection => {
  mediaConnection.on('stream', stream => {
    // video要素にカメラ映像をセットして再生
    const videoElm = document.getElementById('their-video')
    videoElm.srcObject = stream;
    videoElm.play();
  });
}

//着信処理
peer.on('call', mediaConnection => {
  mediaConnection.answer(localStream);
  setEventListener(mediaConnection);
});

navigator.mediaDevices
  .getDisplayMedia(mediaStreamConstraints)
  .then(gotLocalMediaStream)
  .catch(handleLocalMediaStreamError);

