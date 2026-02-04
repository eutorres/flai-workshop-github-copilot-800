import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Activities = () => {
  const { t } = useTranslation();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
    console.log('Activities Component - Fetching from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        console.log('Activities Component - Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Activities Component - Fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        console.log('Activities Component - Processed activities:', activitiesData);
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Activities Component - Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="alert alert-info d-flex align-items-center" role="alert">
          <div className="spinner-border spinner-border-sm me-3" role="status">
            <span className="visually-hidden">{t('loading')}</span>
          </div>
          <div>{t('loading')}</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">{t('error')}</h4>
          <p className="mb-0">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">🏃 {t('activitiesTitle')}</h2>
        <span className="badge bg-primary rounded-pill">{activities.length} {t('activitiesLogged')}</span>
      </div>
      {activities.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          <h5 className="alert-heading">{t('noActivitiesFound')}</h5>
          <p className="mb-0">{t('noActivitiesFoundDesc')}</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">{t('id')}</th>
                <th scope="col">{t('user')}</th>
                <th scope="col">{t('activityType')}</th>
                <th scope="col">{t('duration')}</th>
                <th scope="col">{t('calories')}</th>
                <th scope="col">{t('date')}</th>
              </tr>
            </thead>
            <tbody>
              {activities.map(activity => (
                <tr key={activity.id}>
                  <td><span className="badge bg-secondary">{activity.id}</span></td>
                  <td><strong>{activity.user_email}</strong></td>
                  <td>
                    <span className="badge bg-info text-dark">
                      {activity.activity_type}
                    </span>
                  </td>
                  <td>{activity.duration} {t('minutes')}</td>
                  <td>
                    <span className="badge bg-success">
                      {activity.calories} {t('kcal')}
                    </span>
                  </td>
                  <td>{new Date(activity.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Activities;
