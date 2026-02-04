import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Reusable Error Alert Component
 */
const ErrorAlert = ({ error, onRetry }) => {
  const { t } = useTranslation();

  return (
    <div className="container mt-4">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">{t('error')}</h4>
        <p className="mb-0">{error}</p>
        {onRetry && (
          <button className="btn btn-danger mt-3" onClick={onRetry}>
            {t('retry') || 'Retry'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorAlert;
