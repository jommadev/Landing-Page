import React, { useEffect, useState } from 'react';

const CustomToast = ({ message, setShowToast }) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [toasterShowTime, setToasterShowTime] = useState(3000);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => prevProgress + (100 / toasterShowTime) * 100); // Adjust based on the duration and desired update frequency
    }, 100); // Update the progress every 100 milliseconds (adjust as needed)

    const timeout = setTimeout(() => {
      setVisible(false);
      setShowToast(false);
      clearInterval(interval);
    }, toasterShowTime); // Adjust the time (in milliseconds) the message stays visible

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [setShowToast, toasterShowTime]);

  return (
    <div className="custome-toaster-container">
      <div className="custome-toaster">
        
        <div className='custome-toaster-message'>{message}</div>
        <div className="custome-toaster-progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default CustomToast;
