import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Reusable Loading Spinner Component
 */
const LoadingSpinner = ({ message }) => {
  const { t } = useTranslation();

  return (
    <div className="container mt-4">
      <div className="alert alert-info d-flex align-items-center" role="alert">
        <div className="spinner-border spinner-border-sm me-3" role="status">
          <span className="visually-hidden">{t('loading')}</span>
        </div>
        <div>{message || t('loading')}...</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
