import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Layout.css';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="logo">
          <img src="/vite.svg" alt="Hubly" style={{ width: '30px' }} />
          {/* Placeholder logo */}
        </div>
        <nav>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
            <span className="icon">🏠</span>
            <span className="label">Dashboard</span>
          </NavLink>
          <NavLink to="/chat-center" className={({ isActive }) => isActive ? 'active' : ''}>
            <span className="icon">💬</span>
            <span className="label">Contact Center</span>
          </NavLink>
          <NavLink to="/analytics" className={({ isActive }) => isActive ? 'active' : ''}>
            <span className="icon">📊</span>
            <span className="label">Analytics</span>
          </NavLink>
          {/* Added Chat Bot Link */}
          <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
            <span className="icon">🤖</span>
            <span className="label">Chat Bot</span>
          </NavLink>
          <NavLink to="/team" className={({ isActive }) => isActive ? 'active' : ''}>
            <span className="icon">👥</span>
            <span className="label">Team</span>
          </NavLink>
          {/* Renamed Settings to Profile/General Settings if needed, but per requirement "Settings" is Chat Bot Settings. 
              However, the user also showed a "Settings" page which is "Edit Profile".
              Let's clarify: 
              Requirement 6: "Chat Bot Settings".
              Requirement 7: "Team Management" -> "Edit only their own profile".
              The screenshot shows "Chat Bot" as a sidebar item with a robot icon.
              And "Setting" (gear icon) as another item which shows "Edit Profile".
              
              So I should split /settings into /chat-bot-settings and /profile-settings?
              Or just map /settings to Chat Bot and create a new /profile for the gear icon.
              
              Let's adjust routes in App.jsx later. For now, update Sidebar.
          */}
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
            <span className="icon">⚙️</span>
            <span className="label">Setting</span>
          </NavLink>
        </nav>
        <div className="user-profile">
          <div className="avatar">{user?.name?.charAt(0)}</div>
          <button onClick={handleLogout} className="logout-btn" title="Logout">🚪</button>
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
