import React from 'react';

/**
 * Reusable Empty State Component
 */
const EmptyState = ({ icon = '📭', title, description, action }) => {
  return (
    <div className="alert alert-warning text-center" role="alert">
      <div className="fs-1 mb-3">{icon}</div>
      <h5 className="alert-heading">{title}</h5>
      <p className="mb-3">{description}</p>
      {action && action}
    </div>
  );
};

export default EmptyState;
