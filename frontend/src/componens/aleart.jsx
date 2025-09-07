import React from 'react';

const Alert = ({ message, type, onClose }) => {
  if (!message) return null;

  const typeClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
  };

  return (
    <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 p-4 rounded-lg shadow-lg text-white font-bold ${typeClasses[type]}`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Alert;