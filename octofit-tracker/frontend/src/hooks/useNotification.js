import { useState, useCallback } from 'react';

/**
 * Custom hook for toast notifications
 * @returns {Object} { notification, showNotification, hideNotification }
 */
export const useNotification = () => {
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((message, type = 'info', duration = 3000) => {
    setNotification({ message, type });

    if (duration > 0) {
      setTimeout(() => {
        setNotification(null);
      }, duration);
    }
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return {
    notification,
    showNotification,
    hideNotification,
  };
};
