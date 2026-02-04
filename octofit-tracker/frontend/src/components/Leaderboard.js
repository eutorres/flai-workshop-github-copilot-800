import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Leaderboard = () => {
  const { t } = useTranslation();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Leaderboard Component - Fetching from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        console.log('Leaderboard Component - Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Leaderboard Component - Fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Leaderboard Component - Processed leaderboard:', leaderboardData);
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Leaderboard Component - Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const getMedalEmoji = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '🏅';
  };

  const getRankBadgeClass = (rank) => {
    if (rank === 1) return 'rank-gold';
    if (rank === 2) return 'rank-silver';
    if (rank === 3) return 'rank-bronze';
    return 'bg-primary';
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
        <h2 className="mb-0">🏆 {t('leaderboardTitle')}</h2>
        <span className="badge bg-primary rounded-pill">{leaderboard.length} {t('registered')}</span>
      </div>
      {leaderboard.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          <h5 className="alert-heading">{t('noLeaderboardData')}</h5>
          <p className="mb-0">{t('noLeaderboardDataDesc')}</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col" className="text-center">{t('rank')}</th>
                <th scope="col">{t('id')}</th>
                <th scope="col">{t('user')}</th>
                <th scope="col">{t('team')}</th>
                <th scope="col" className="text-center">{t('totalCalories')}</th>
                <th scope="col" className="text-center">{t('totalActivities')}</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.id} className={index < 3 ? 'table-warning' : ''}>
                  <td className="text-center">
                    <span className={`badge ${getRankBadgeClass(index + 1)}`}>
                      {getMedalEmoji(index + 1)} {index + 1}
                    </span>
                  </td>
                  <td><span className="badge bg-secondary">{entry.id}</span></td>
                  <td>
                    <strong className={index < 3 ? 'text-primary' : ''}>
                      {entry.user_name || 'N/A'}
                    </strong>
                  </td>
                  <td>
                    <span className="badge bg-info text-dark">
                      {entry.team || 'N/A'}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-success fs-6">
                      {entry.total_calories || 0} {t('kcal')}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-primary">
                      {entry.total_activities || 0}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
