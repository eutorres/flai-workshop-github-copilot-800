import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Workouts = () => {
  const { t } = useTranslation();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Workouts Component - Fetching from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        console.log('Workouts Component - Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts Component - Fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Workouts Component - Processed workouts:', workoutsData);
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Workouts Component - Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const getDifficultyBadge = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'beginner':
        return 'bg-success';
      case 'intermediate':
        return 'bg-warning text-dark';
      case 'advanced':
        return 'bg-danger';
      default:
        return 'bg-primary';
    }
  };

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
        <h2 className="mb-0">💪 {t('workoutsTitle')}</h2>
        <span className="badge bg-primary rounded-pill">{workouts.length} {t('workoutsAvailable')}</span>
      </div>
      {workouts.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          <h5 className="alert-heading">{t('noWorkoutsFound')}</h5>
          <p className="mb-0">{t('noWorkoutsFoundDesc')}</p>
        </div>
      ) : (
        <div className="row">
          {workouts.map(workout => (
            <div key={workout.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title mb-0">{workout.name}</h5>
                    <span className="badge bg-secondary">{workout.id}</span>
                  </div>
                  <div className="mb-3">
                    <span className="badge bg-info text-dark me-2">
                      {workout.activity_type || 'N/A'}
                    </span>
                    <span className={`badge ${getDifficultyBadge(workout.difficulty)}`}>
                      {workout.difficulty || 'N/A'}
                    </span>
                  </div>
                  <p className="card-text flex-grow-1">
                    {workout.description || 'No description available'}
                  </p>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <small className="text-muted">
                      <strong>{t('duration')}:</strong>
                    </small>
                    <span className="badge bg-primary">
                      ⏱️ {workout.duration || 0} {t('minutes')}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      <strong>{t('caloriesEstimate')}:</strong>
                    </small>
                    <span className="badge bg-success">
                      🔥 ~{workout.calories_estimate || 0} {t('kcal')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Workouts;
