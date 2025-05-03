import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const NormalFace = ({style}) => {
  const [frameIndex, setFrameIndex] = useState(0);
  const pathRef = useRef(null);
  const animationDuration = [1.25, 0.75, 0.75]; // Frame 1 lasts longer (1.5 seconds)
  const animationDelay = 1; // seconds between transitions

  const keyframes = [
    "M42.3691 11.3994C51.5456 11.5601 58.034 15.8237 61.8349 24.1885C62.5271 25.7914 63.0486 27.4491 63.3984 29.1611C63.0338 30.9508 62.0865 32.3718 60.5566 33.4238C51.6394 38.4091 42.3559 39.167 32.707 35.6973C30.081 34.6779 27.8541 33.1153 26.0283 31.0088C25.5964 29.9077 25.5015 28.7707 25.7441 27.5986C28.1892 18.9482 33.7312 13.5478 42.3691 11.3994ZM42.6533 17.9355C37.8959 19.7074 34.438 22.9282 32.2802 27.5977C32.0674 27.9202 32.115 28.2044 32.4228 28.4502C40.3923 32.2104 48.3494 32.2104 56.2939 28.4502C56.6012 28.2045 56.6482 27.92 56.4355 27.5977C55.9394 26.5103 55.3709 25.4682 54.7304 24.4717C51.9666 19.9408 47.9406 17.7618 42.6533 17.9355Z M22 14C22 21.732 17.0751 28 11 28C4.92487 28 0 21.732 0 14C0 6.26801 4.92487 0 11 0C17.0751 0 22 6.26801 22 14Z M89 14.5C89 22.232 84.0751 28.5 78 28.5C71.9249 28.5 67 22.232 67 14.5C67 6.76801 71.9249 0.5 78 0.5C84.0751 0.5 89 6.76801 89 14.5Z", // open
    "M42.7903 1.32214C51.9668 1.48284 58.4553 5.74652 62.2562 14.1112C62.9483 15.7141 63.4698 17.3718 63.8196 19.0839C63.4551 20.8735 62.5077 22.2945 60.9778 23.3466C52.0607 28.3319 42.7771 29.0897 33.1282 25.62C30.5022 24.6007 28.2753 23.038 26.4495 20.9315C26.0176 19.8305 25.9228 18.6934 26.1653 17.5214C28.6104 8.87093 34.1524 3.47054 42.7903 1.32214ZM43.0736 7.85828C38.3164 9.63011 34.8592 12.851 32.7015 17.5204C32.4888 17.8427 32.5358 18.1272 32.8431 18.3729C40.8125 22.1332 48.7697 22.1331 56.7142 18.3729C57.0219 18.1271 57.0696 17.8429 56.8568 17.5204C56.3606 16.433 55.7921 15.3909 55.1517 14.3944C52.3878 9.8634 48.3611 7.68436 43.0736 7.85828Z M22 4.5C22 6.98528 17.0751 9 11 9C4.92487 9 0 6.98528 0 4.5C0 2.01472 4.92487 0 11 0C17.0751 0 22 2.01472 22 4.5Z M89 4.5C89 6.98528 84.0751 9 78 9C71.9249 9 67 6.98528 67 4.5C67 2.01472 71.9249 0 78 0C84.0751 0 89 2.01472 89 4.5Z", // eye 3
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

export default NormalFace;
