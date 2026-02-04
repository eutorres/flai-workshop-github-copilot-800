import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetch } from '../hooks/useFetch';
import { useForm } from '../hooks/useForm';
import { userService } from '../services/user.service';
import { teamService } from '../services/team.service';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorAlert from './common/ErrorAlert';
import EmptyState from './common/EmptyState';
import DataTable from './common/DataTable';

const Users = () => {
  const { t } = useTranslation();
  const [editingUser, setEditingUser] = useState(null);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Fetch users and teams using custom hook
  const { 
    data: users, 
    loading: usersLoading, 
    error: usersError, 
    refetch: refetchUsers 
  } = useFetch(userService.getAll, []);

  const { 
    data: teams, 
    loading: teamsLoading 
  } = useFetch(teamService.getAll, []);

  // Form management with custom hook
  const { values: editForm, handleChange, setValues } = useForm({
    name: '',
    email: '',
    team: ''
  });

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
      await userService.update(userId, editForm);
      setSaveSuccess(true);
      await refetchUsers();
      
      setTimeout(() => {
        setEditingUser(null);
        setSaveSuccess(false);
      }, 1500);
    } catch (error) {
      console.error('Error updating user:', error);
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
  if (usersLoading || teamsLoading) {
    return <LoadingSpinner message={t('loadingUsers')} />;
  }

  // Error state
  if (usersError) {
    return <ErrorAlert error={usersError} onRetry={refetchUsers} />;
  }

  const columns = [
    t('id'),
    t('name'),
    t('email'),
    t('team'),
    t('memberSince'),
    t('actions')
  ];

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
      
      {!users || users.length === 0 ? (
        <EmptyState 
          icon="👥"
          title={t('noUsersFound')}
          description={t('noUsersFoundDesc')}
        />
      ) : (
        <DataTable 
          columns={columns}
          data={users}
          renderRow={renderUserRow}
        />
      )}
    </div>
  );
};

export default Users;
