import React, { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import io from 'socket.io-client';

const VideoCall = ({ roomId, onClose }) => {
  const [stream, setStream] = useState(null);
  const [peer, setPeer] = useState(null);
  const [remotePeerConnected, setRemotePeerConnected] = useState(false);
  const [error, setError] = useState('');
  const [connecting, setConnecting] = useState(true);
  const myVideo = useRef();
  const remoteVideo = useRef();
  const socketRef = useRef();
  const peerRef = useRef();

  useEffect(() => {
    let localStream = null;

    const init = async () => {
      try {
        // Connect to signaling server
        socketRef.current = io('http://localhost:5000', {
          transports: ['websocket'],
        });

        // Socket event handlers
        socketRef.current.on('connect', () => {
          console.log('Connected to server');
          setError('');
        });

        socketRef.current.on('connect_error', (err) => {
          console.error('Socket connection error:', err);
          setError('Failed to connect to server. Please try again.');
        });

        // Get user media
        localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        
        setStream(localStream);
        if (myVideo.current) {
          myVideo.current.srcObject = localStream;
        }

        // Join room
        socketRef.current.emit('join-room', roomId);
        console.log('Joining room:', roomId);

        // Handle room being full
        socketRef.current.on('room-full', () => {
          setError('Room is full. Please try another room.');
          setConnecting(false);
        });

        // Handle peer disconnection
        socketRef.current.on('peer-disconnected', () => {
          console.log('Peer disconnected');
          setRemotePeerConnected(false);
          if (peerRef.current) {
            peerRef.current.destroy();
            peerRef.current = null;
          }
          if (remoteVideo.current) {
            remoteVideo.current.srcObject = null;
          }
        });

        // Handle new peer joining
        socketRef.current.on('user-joined', () => {
          console.log('Peer joined, creating initiator peer');
          setConnecting(false);
          createPeer(true, localStream);
        });

        // Handle incoming signals
        socketRef.current.on('signal', ({ signal }) => {
          console.log('Received signal');
          if (peerRef.current) {
            peerRef.current.signal(signal);
          } else {
            console.log('Creating receiver peer');
            createPeer(false, localStream, signal);
          }
        });

      } catch (err) {
        console.error('Error in init:', err);
        setError(err.message);
        setConnecting(false);
      }
    };

    const createPeer = (isInitiator, stream, incomingSignal = null) => {
      try {
        const newPeer = new Peer({
          initiator: isInitiator,
          trickle: false,
          stream: stream
        });

        newPeer.on('signal', data => {
          console.log('Sending signal');
          socketRef.current.emit('signal', { signal: data, roomId });
        });

        newPeer.on('stream', remoteStream => {
          console.log('Received remote stream');
          if (remoteVideo.current) {
            remoteVideo.current.srcObject = remoteStream;
            setRemotePeerConnected(true);
            setConnecting(false);
          }
        });

        newPeer.on('error', err => {
          console.error('Peer error:', err);
          setError('Connection error: ' + err.message);
          setConnecting(false);
        });

        if (incomingSignal) {
          newPeer.signal(incomingSignal);
        }

        peerRef.current = newPeer;
        setPeer(newPeer);

      } catch (err) {
        console.error('Error creating peer:', err);
        setError('Failed to create peer connection: ' + err.message);
        setConnecting(false);
      }
    };

    init();

    // Cleanup
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (peerRef.current) {
        peerRef.current.destroy();
      }
    };
  }, [roomId]);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">Video Call</h2>
            <p className="text-sm text-gray-500">Room ID: {roomId}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {connecting && !error && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
            Connecting to room...
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <video
              ref={myVideo}
              autoPlay
              muted
              playsInline
              className="w-full h-64 rounded-lg bg-gray-900 object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded">
              You
            </div>
          </div>
          
          <div className="relative">
            {remotePeerConnected ? (
              <video
                ref={remoteVideo}
                autoPlay
                playsInline
                className="w-full h-64 rounded-lg bg-gray-900 object-cover"
              />
            ) : (
              <div className="w-full h-64 rounded-lg bg-gray-900 flex items-center justify-center text-white">
                {connecting ? 'Connecting...' : 'Waiting for peer to join...'}
              </div>
            )}
            <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded">
              Peer
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            End Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
