import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './App.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  const { t } = useTranslation();
  console.log('App Component - REACT_APP_CODESPACE_NAME:', process.env.REACT_APP_CODESPACE_NAME);
  console.log('App Component - Backend API Base URL:', `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/`);

  return (
    <Router>
      <div className="App">
        {/* Left Sidebar Navigation */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <Link className="sidebar-brand d-flex align-items-center" to="/">
              <img 
                src="/octofitapp-logo.png" 
                alt="OctoFit Logo" 
                height="40" 
                className="me-2"
              />
              <strong>{t('appName')}</strong>
            </Link>
          </div>
          
          <nav className="sidebar-nav">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  <span className="nav-icon">👥</span>
                  <span className="nav-text">{t('users')}</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">
                  <span className="nav-icon">🤝</span>
                  <span className="nav-text">{t('teams')}</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">
                  <span className="nav-icon">🏃</span>
                  <span className="nav-text">{t('activities')}</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">
                  <span className="nav-icon">💪</span>
                  <span className="nav-text">{t('workouts')}</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  <span className="nav-icon">🏆</span>
                  <span className="nav-text">{t('leaderboard')}</span>
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="sidebar-footer">
            <LanguageSwitcher />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="main-content">
          <Routes>
          <Route path="/" element={
            <div className="container mt-5">
              <div className="text-center mb-5">
                <h1 className="display-4 fw-bold text-primary mb-3">{t('welcome')}</h1>
                <p className="lead fs-3">{t('welcomeSubtitle')}</p>
                <hr className="my-4" />
              </div>
              
              <div className="row g-4 mb-5">
                <div className="col-md-6 col-lg-4">
                  <Link to="/users" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="card text-center h-100" style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }} 
                         onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)'; }}
                         onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = ''; }}>
                      <div className="card-body">
                        <div className="fs-1 mb-3">👥</div>
                        <h5 className="card-title">{t('users')}</h5>
                        <p className="card-text">{t('viewUsersDesc')}</p>
                        <span className="btn btn-primary">{t('viewUsers')}</span>
                      </div>
                    </div>
                  </Link>
                </div>
                
                <div className="col-md-6 col-lg-4">
                  <Link to="/teams" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="card text-center h-100" style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }} 
                         onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)'; }}
                         onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = ''; }}>
                      <div className="card-body">
                        <div className="fs-1 mb-3">🤝</div>
                        <h5 className="card-title">{t('teams')}</h5>
                        <p className="card-text">{t('viewTeamsDesc')}</p>
                        <span className="btn btn-primary">{t('viewTeams')}</span>
                      </div>
                    </div>
                  </Link>
                </div>
                
                <div className="col-md-6 col-lg-4">
                  <Link to="/activities" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="card text-center h-100" style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }} 
                         onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)'; }}
                         onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = ''; }}>
                      <div className="card-body">
                        <div className="fs-1 mb-3">🏃</div>
                        <h5 className="card-title">{t('activities')}</h5>
                        <p className="card-text">{t('viewActivitiesDesc')}</p>
                        <span className="btn btn-primary">{t('viewActivities')}</span>
                      </div>
                    </div>
                  </Link>
                </div>
                
                <div className="col-md-6 col-lg-4">
                  <Link to="/workouts" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="card text-center h-100" style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }} 
                         onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)'; }}
                         onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = ''; }}>
                      <div className="card-body">
                        <div className="fs-1 mb-3">💪</div>
                        <h5 className="card-title">{t('workouts')}</h5>
                        <p className="card-text">{t('viewWorkoutsDesc')}</p>
                        <span className="btn btn-primary">{t('viewWorkouts')}</span>
                      </div>
                    </div>
                  </Link>
                </div>
                
                <div className="col-md-6 col-lg-4">
                  <Link to="/leaderboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="card text-center h-100" style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }} 
                         onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)'; }}
                         onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = ''; }}>
                      <div className="card-body">
                        <div className="fs-1 mb-3">🏆</div>
                        <h5 className="card-title">{t('leaderboard')}</h5>
                        <p className="card-text">{t('viewLeaderboardDesc')}</p>
                        <span className="btn btn-primary">{t('viewLeaderboard')}</span>
                      </div>
                    </div>
                  </Link>
                </div>
                
                <div className="col-md-6 col-lg-4">
                  <div className="card text-center h-100 border-primary">
                    <div className="card-body">
                      <div className="fs-1 mb-3">🎯</div>
                      <h5 className="card-title text-primary">Get Started</h5>
                      <p className="card-text">Ready to begin your fitness journey?</p>
                      <button className="btn btn-success">Start Now</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="alert alert-info" role="alert">
                <h5 className="alert-heading">📊 Track Your Progress</h5>
                <p className="mb-0">
                  Join a team, log your activities, and compete with others to stay motivated 
                  on your fitness journey. Use the navigation menu above to get started!
                </p>
              </div>
            </div>
          } />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
