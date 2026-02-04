import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const Users = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const usersApiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
    const teamsApiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    
    console.log('Users Component - Fetching users from:', usersApiUrl);
    console.log('Users Component - Fetching teams from:', teamsApiUrl);
    console.log('Users Component - REACT_APP_CODESPACE_NAME:', process.env.REACT_APP_CODESPACE_NAME);

    Promise.all([
      fetch(usersApiUrl).then(response => {
        console.log('Users Component - Users response status:', response.status);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      }),
      fetch(teamsApiUrl).then(response => {
        console.log('Users Component - Teams response status:', response.status);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
    ])
      .then(([usersData, teamsData]) => {
        console.log('Users Component - Fetched users data:', usersData);
        console.log('Users Component - Fetched teams data:', teamsData);
        
        // Handle both paginated (.results) and plain array responses
        const processedUsers = usersData.results || usersData;
        const processedTeams = teamsData.results || teamsData;
        
        console.log('Users Component - Processed users:', processedUsers);
        console.log('Users Component - Processed teams:', processedTeams);
        
        setUsers(Array.isArray(processedUsers) ? processedUsers : []);
        setTeams(Array.isArray(processedTeams) ? processedTeams : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Users Component - Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Form management
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    team: ''
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  }, []);

  const setValues = useCallback((values) => {
    setEditForm(values);
  }, []);

  const refetchUsers = useCallback(async () => {
    const usersApiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
    console.log('Users Component - Refetching users from:', usersApiUrl);
    
    try {
      const response = await fetch(usersApiUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      const processedUsers = data.results || data;
      setUsers(Array.isArray(processedUsers) ? processedUsers : []);
    } catch (error) {
      console.error('Users Component - Error refetching users:', error);
    }
  }, []);

  // Handle edit action
  const handleEdit = useCallback((user) => {
    setEditingUser(user.id);
    setValues({
      name: user.name,
      email: user.email,
      team: user.team || ''
    });
    setSaveError(null);
    setSaveSuccess(false);
  }, [setValues]);

  // Handle cancel action
  const handleCancel = useCallback(() => {
    setEditingUser(null);
    setValues({ name: '', email: '', team: '' });
    setSaveError(null);
    setSaveSuccess(false);
  }, [setValues]);

  // Handle save action
  const handleSave = useCallback(async (userId) => {
    try {
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/${userId}/`;
      console.log('Users Component - Updating user at:', apiUrl, 'with data:', editForm);
      
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editForm,
          team: editForm.team || null
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      console.log('Users Component - User updated successfully');
      setSaveSuccess(true);
      await refetchUsers();
      
      setTimeout(() => {
        setEditingUser(null);
        setSaveSuccess(false);
      }, 1500);
    } catch (error) {
      console.error('Users Component - Error updating user:', error);
      setSaveError(error.message);
    }
  }, [editForm, refetchUsers]);

  // Render table row
  const renderUserRow = useCallback((user) => {
    const isEditing = editingUser === user.id;

    return (
      <tr key={user.id}>
        <td><span className="badge bg-secondary">{user.id}</span></td>
        <td>
          {isEditing ? (
            <input
              type="text"
              className="form-control form-control-sm"
              name="name"
              value={editForm.name}
              onChange={handleChange}
            />
          ) : (
            <strong className="text-primary">{user.name}</strong>
          )}
        </td>
        <td>
          {isEditing ? (
            <input
              type="email"
              className="form-control form-control-sm"
              name="email"
              value={editForm.email}
              onChange={handleChange}
            />
          ) : (
            <a href={`mailto:${user.email}`} className="text-decoration-none">
              {user.email}
            </a>
          )}
        </td>
        <td>
          {isEditing ? (
            <select
              className="form-select form-select-sm"
              name="team"
              value={editForm.team}
              onChange={handleChange}
            >
              <option value="">{t('noTeam')}</option>
              {teams?.map(team => (
                <option key={team.id} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>
          ) : (
            user.team ? (
              <span className="badge bg-info text-dark">{user.team}</span>
            ) : (
              <span className="badge bg-secondary">{t('noTeam')}</span>
            )
          )}
        </td>
        <td>{new Date(user.created_at).toLocaleDateString()}</td>
        <td>
          {isEditing ? (
            <div className="btn-group btn-group-sm" role="group">
              <button
                className="btn btn-success"
                onClick={() => handleSave(user.id)}
                title={t('save')}
              >
                💾 {t('save')}
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleCancel}
                title={t('cancel')}
              >
                ❌ {t('cancel')}
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleEdit(user)}
              title={t('edit')}
            >
              ✏️ {t('edit')}
            </button>
          )}
        </td>
      </tr>
    );
  }, [editingUser, editForm, handleChange, handleEdit, handleCancel, handleSave, teams, t]);

  // Loading state
  if (loading) {
    return (
      <div className="container mt-4">
        <div className="alert alert-info d-flex align-items-center" role="alert">
          <div className="spinner-border spinner-border-sm me-3" role="status">
            <span className="visually-hidden">{t('loading')}</span>
          </div>
          <div>{t('loadingUsers')}</div>
        </div>
      </div>
    );
  }

  // Error state
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
        <h2 className="mb-0">👥 {t('usersTitle')}</h2>
        <span className="badge bg-primary rounded-pill">
          {users?.length || 0} {t('registered')}
        </span>
      </div>
      
      {saveSuccess && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>{t('success')}</strong> {t('userUpdatedSuccess')}
          <button type="button" className="btn-close" onClick={() => setSaveSuccess(false)}></button>
        </div>
      )}
      
      {saveError && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>{t('error')}</strong> {saveError}
          <button type="button" className="btn-close" onClick={() => setSaveError(null)}></button>
        </div>
      )}
      
      {users.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          <h5 className="alert-heading">{t('noUsersFound')}</h5>
          <p className="mb-0">{t('noUsersFoundDesc')}</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">{t('id')}</th>
                <th scope="col">{t('name')}</th>
                <th scope="col">{t('email')}</th>
                <th scope="col">{t('team')}</th>
                <th scope="col">{t('memberSince')}</th>
                <th scope="col">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {users.map(renderUserRow)}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
