import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetch } from '../hooks/useFetch';
import { teamService } from '../services/team.service';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorAlert from './common/ErrorAlert';
import EmptyState from './common/EmptyState';

const Teams = () => {
  const { t } = useTranslation();

  // Fetch teams using custom hook
  const { 
    data: teams, 
    loading, 
    error, 
    refetch 
  } = useFetch(teamService.getAll, []);

  // Render team card
  const renderTeamCard = useCallback((team) => (
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
  ), [t]);

  // Loading state
  if (loading) {
    return <LoadingSpinner message={t('loading')} />;
  }

  // Error state
  if (error) {
    return <ErrorAlert error={error} onRetry={refetch} />;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">🤝 {t('teamsTitle')}</h2>
        <span className="badge bg-primary rounded-pill">
          {teams?.length || 0} {t('teamsRegistered')}
        </span>
      </div>
      
      {!teams || teams.length === 0 ? (
        <EmptyState 
          icon="🤝"
          title={t('noTeamsFound')}
          description={t('noTeamsFoundDesc')}
        />
      ) : (
        <div className="row">
          {teams.map(renderTeamCard)}
        </div>
      )}
    </div>
  );
};

export default Teams;
