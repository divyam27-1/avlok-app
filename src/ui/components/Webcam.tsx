import React, { useEffect, useRef } from 'react';

const Webcam = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Request access to the webcam
    const getWebcamStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        // Set the video stream as the source for the video element
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the webcam: ", error);
      }
    };

    getWebcamStream();
  }, []);

  return (
    <div className='h-screen w-screen m-0 p-0 overflow-hidden'>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: '100%', height: '100%', border: '1px solid black', objectFit: 'cover' }}
      />
    </div>
  );
};

export default Webcam;
