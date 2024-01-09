
import React, { useEffect, useRef } from 'react';
import SimplePeer from 'simple-peer';

const VideoCall = () => {
  const videoRef = useRef();
  const peer = new SimplePeer({ initiator: true, trickle: false });

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        peer.addStream(stream);

        peer.on('signal', (data) => {
          // Send the signal data to the other peer (e.g., using a signaling server)
          console.log('Signal data to send:', data);
        });

        peer.on('stream', (remoteStream) => {
          // Handle the remote stream (display it in another video element)
          // For example: remoteVideoRef.current.srcObject = remoteStream;
        });
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });

  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline muted />
    </div>
  );
};

export default VideoCall;