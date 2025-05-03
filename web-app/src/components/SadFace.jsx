import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const SadFace = ({style}) => {
  const [frameIndex, setFrameIndex] = useState(0);
  const pathRef = useRef(null);
  const animationDuration = [1.25, 0.75, 0.75]; // Frame 1 lasts longer (1.5 seconds)
  const animationDelay = 1; // seconds between transitions

  const keyframes = [
    "M42.3691 11.3994C51.5456 11.5601 58.034 15.8237 61.8349 24.1885C62.5271 25.7914 63.0486 27.4491 63.3984 29.1611C63.0338 30.9508 62.0865 32.3718 60.5566 33.4238C51.6394 38.4091 42.3559 39.167 32.707 35.6973C30.081 34.6779 27.8541 33.1153 26.0283 31.0088C25.5964 29.9077 25.5015 28.7707 25.7441 27.5986C28.1892 18.9482 33.7312 13.5478 42.3691 11.3994ZM42.6533 17.9355C37.8959 19.7074 34.438 22.9282 32.2802 27.5977C32.0674 27.9202 32.115 28.2044 32.4228 28.4502C40.3923 32.2104 48.3494 32.2104 56.2939 28.4502C56.6012 28.2045 56.6482 27.92 56.4355 27.5977C55.9394 26.5103 55.3709 25.4682 54.7304 24.4717C51.9666 19.9408 47.9406 17.7618 42.6533 17.9355Z M22 14C22 21.732 17.0751 28 11 28C4.92487 28 0 21.732 0 14C0 6.26801 4.92487 0 11 0C17.0751 0 22 6.26801 22 14Z M89 14.5C89 22.232 84.0751 28.5 78 28.5C71.9249 28.5 67 22.232 67 14.5C67 6.76801 71.9249 0.5 78 0.5C84.0751 0.5 89 6.76801 89 14.5Z", // open
    "M42.352 18C51.308 18.157 57.641 22.317 61.35 30.481C62.026 32.045 62.534 33.663 62.876 35.334C62.52 37.081 61.595 38.467 60.102 39.494C51.4 44.36 42.34 45.099 32.923 41.713C30.36 40.718 28.187 39.193 26.405 37.137C25.984 36.062 25.891 34.953 26.128 33.809C28.514 25.367 33.922 20.097 42.352 18ZM42.63 24.379C37.987 26.108 34.613 29.252 32.507 33.809C32.299 34.123 32.345 34.401 32.645 34.641C40.423 38.31 48.189 38.31 55.942 34.641C56.242 34.401 56.288 34.123 56.081 33.809C55.597 32.747 55.042 31.73 54.417 30.758C51.719 26.336 47.79 24.209 42.63 24.379ZM22 17C22 24.732 17.075 31 11 31C4.925 31 0 24.732 0 17C0 9.268 5.5 14 11 3C16.5 -5.5 22 9.268 22 17ZM89 17.5C89 25.232 84.075 31.5 78 31.5C71.925 31.5 67 25.232 67 17.5C67 9.768 73.5 -1.5 78 3.5C83.5 14 89 9.768 89 17.5Z"
];

  useEffect(() => {
    if (!keyframes || keyframes.length < 2) return;

    const animatePath = () => {
      const nextFrameIndex = (frameIndex + 1) % keyframes.length;

      gsap.to(pathRef.current, {
        duration: animationDuration[frameIndex], // Use custom duration based on frame
        attr: { d: keyframes[nextFrameIndex] },
        ease: 'easeInOutQuad',
        onComplete: () => {
          setFrameIndex(nextFrameIndex);
          // Schedule the next animation after a delay
          setTimeout(animatePath, animationDelay * 1000);
        },
      });
    };

    // Start the animation loop after the initial render
    setTimeout(animatePath, animationDelay * 1000);

    // Cleanup function (not strictly needed for this infinite loop demo)
    return () => {
      gsap.killTweensOf(pathRef.current);
      clearTimeout(animatePath);
    };
  }, [keyframes, frameIndex]);

  return (
    <>
      <svg
        style={style}
        width="200"
        height="200"
        viewBox="0 0 208 221"
        fill="none"
      >
        <path
          ref={pathRef}
          d={keyframes[frameIndex]}
          fill="black"
          stroke="black"
          strokeWidth="1"
        />
      </svg>
    </>
  );
};

export default SadFace;
