import React, { useState, useEffect } from 'react';

const HappyFace = ({ style, duration = 0.5, loopDelay = 0 }) => {
  const [animationState, setAnimationState] = useState('normal');
  const [isAnimating, setIsAnimating] = useState(false);

  const svgPath = 
    "M46.0476 14.1798C55.0034 14.3365 61.3362 18.4969 65.0457 26.6603C65.7212 28.2246 66.2296 29.8429 66.571 31.5138C66.2152 33.2604 65.2906 34.6472 63.7976 35.674C55.0948 40.5394 46.0348 41.2791 36.6179 37.8927C34.055 36.8979 31.8823 35.3725 30.1003 33.3165C29.6789 32.2419 29.5862 31.1323 29.823 29.9884C32.2093 21.5463 37.6176 16.2765 46.0476 14.1798M46.3249 20.5587C41.6821 22.2879 38.3078 25.4313 36.2019 29.9884C35.9942 30.3031 36.0403 30.5806 36.3406 30.8204C44.1184 34.4902 51.884 34.4902 59.6374 30.8204C59.9375 30.5806 59.9838 30.3031 59.7761 29.9884C59.2919 28.9271 58.7371 27.9102 58.1121 26.9376C55.4146 22.5156 51.4853 20.389 46.3249 20.5587M78.0917 0.174412C86.7012 0.0152172 92.3868 3.99038 95.1483 12.1002C95.8236 13.8954 95.685 15.6058 94.7323 17.2311C92.8857 18.6253 91.1756 18.4866 89.6014 16.815C88.8229 13.7304 87.2975 11.0957 85.0253 8.91074C80.5517 6.29373 76.7149 6.98708 73.5155 10.9908C72.9372 12.4924 71.9665 13.6478 70.6034 14.4576C67.473 14.9327 66.0402 13.5923 66.3046 10.4361C68.4013 4.8704 72.3304 1.44992 78.0917 0.174412M14.0253 0.174432C20.7475 -0.00140376 25.6934 2.86467 28.8632 8.77209C29.7393 10.3602 29.7393 11.9319 28.8632 13.4869C26.8435 15.1066 24.9945 14.9219 23.3163 12.9322C20.7262 7.48882 16.7047 6.05578 11.2518 8.63342C10.3837 9.2236 9.59803 9.91696 8.89441 10.7135C7.6691 12.6097 6.74444 14.6435 6.12097 16.8151C3.834 18.8219 1.89259 18.5446 0.296753 15.983C0.871964 7.22701 5.44814 1.95748 14.0253 0.174432"
  ;

  const animationStyles = {
    normal: {
      transform: 'translateY(0px)',
    },
    squish: {
      transform: `translateY(-10px)`, // adjust 10px as needed
    },
  };

  const transitionStyle = `transform ${duration}s ease-in-out`;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setAnimationState('squish');
        setTimeout(() => {
          setAnimationState('normal');
          setTimeout(() => {
            setIsAnimating(false);
          }, duration * 1000); // Wait for un-squish
        }, duration * 1000 + loopDelay * 1000); // Wait for squish and loop delay
      }
    }, (duration * 2 + loopDelay) * 1000); // Total cycle time

    return () => clearInterval(intervalId);
  }, [duration, loopDelay, isAnimating]);

  return (
      <svg
      style={style}
      width="200"
      height="250"
      viewBox="0 0 208 221"
      fill="none"
    >
      <path
        d={svgPath}
        fill="black"
        style={{
          transition: transitionStyle,
          ...animationStyles[animationState],
        }}
      />
    </svg>
  );
};

export default HappyFace;