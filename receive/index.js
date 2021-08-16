"user strict";
let localStream;

var url = new URL(window.location.href);
var params = url.searchParams;


const peer = new Peer({
  key: 'c2ad39ff-ed02-41e1-b1f1-c918871c1f28',
  debug: 3
});

document.getElementById('make-call').onclick = () => {
  const theirID = document.getElementById('their-id').value;
  const mediaConnection = peer.call(theirID, localStream);
  setEventListener(mediaConnection);
};


window.onload = function() {
  document.getElementById('their-id').value=params.get('id');
}

// イベントリスナを設置する関数
const setEventListener = mediaConnection => {
  mediaConnection.on('stream', stream => {
    // video要素にカメラ映像をセットして再生
    const videoElm = document.getElementById('their-video')
    videoElm.srcObject = stream;
    videoElm.play();
  });
}

function gotLocalMediaStream(mediaStream) {
  localStream = mediaStream;
  localVideo.srcObject = mediaStream;
}

//着信処理
peer.on('call', mediaConnection => {
  mediaConnection.answer(localStream/*, {videoBandwidth: 1400, audioBandwidth: 400}*/);
  setEventListener(mediaConnection);
});
