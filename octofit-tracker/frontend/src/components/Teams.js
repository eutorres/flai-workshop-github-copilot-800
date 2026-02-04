import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Teams = () => {
  const { t } = useTranslation();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Teams Component - Fetching from:', apiUrl);
    console.log('Teams Component - REACT_APP_CODESPACE_NAME:', process.env.REACT_APP_CODESPACE_NAME);

    fetch(apiUrl)
      .then(response => {
        console.log('Teams Component - Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Teams Component - Fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        console.log('Teams Component - Processed teams:', teamsData);
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Teams Component - Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Render team card
  const renderTeamCard = (team) => (
    <div key={team.id} className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100">
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h5 className="card-title mb-0">{team.name}</h5>
            <span className="badge bg-secondary">{team.id}</span>
          </div>
          <p className="card-text flex-grow-1">
            {team.description || t('noDescription') || 'No description available'}
          </p>
          <hr />
          <div className="d-flex justify-content-between align-items-center mb-2">
            <small className="text-muted">
              <strong>{t('members')}:</strong>
            </small>
            <span className="badge bg-success">
              {team.member_count || 0}
            </span>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              <strong>{t('createdOn')}:</strong>
            </small>
            <span className="badge bg-info text-dark">
              {new Date(team.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

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
        <h2 className="mb-0">🤝 {t('teamsTitle')}</h2>
        <span className="badge bg-primary rounded-pill">
          {teams?.length || 0} {t('teamsRegistered')}
        </span>
      </div>
      
      {teams.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          <h5 className="alert-heading">{t('noTeamsFound')}</h5>
          <p className="mb-0">{t('noTeamsFoundDesc')}</p>
        </div>
      ) : (
        <div className="row">
          {teams.map(renderTeamCard)}
        </div>
      )}
    </div>
  );
};

export default Teams;
