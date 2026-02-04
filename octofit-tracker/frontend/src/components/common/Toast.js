import React from 'react';

/**
 * Toast Notification Component
 */
const Toast = ({ message, type = 'info', onClose }) => {
  const getAlertClass = () => {
    switch (type) {
      case 'success':
        return 'alert-success';
      case 'error':
      case 'danger':
        return 'alert-danger';
      case 'warning':
        return 'alert-warning';
      case 'info':
      default:
        return 'alert-info';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
      case 'danger':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  return (
    <div 
      className={`alert ${getAlertClass()} alert-dismissible fade show position-fixed`}
      role="alert"
      style={{
        top: '20px',
        right: '20px',
        minWidth: '300px',
        zIndex: 9999,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
        animation: 'slideInRight 0.3s ease'
      }}
    >
      <strong>{getIcon()} </strong> {message}
      <button 
        type="button" 
        className="btn-close" 
        onClick={onClose}
        aria-label="Close"
      ></button>
    </div>
  );
};

export default Toast;
