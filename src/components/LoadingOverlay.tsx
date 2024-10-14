import React from 'react';
import LoadingAnimat from './LoadingAnimat';
import DrawingsIcon from './DrawingsIcon';


const LoadingOverlay = () => {
  return (
    <div className="loading-overlay">
      <DrawingsIcon />
      <LoadingAnimat />
      <style jsx>{`
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 1);
        }
      `}</style>
    </div>
  );
};

export default LoadingOverlay;
