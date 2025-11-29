import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Layout.css';

function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      path: '/dashboard',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      label: 'Dashboard',
      show: true
    },
    {
      path: '/chat-center',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <line x1="8" y1="10" x2="16" y2="10" />
          <line x1="8" y1="14" x2="16" y2="14" />
        </svg>
      ),
      label: 'Contact Center',
      show: true
    },
    {
      path: '/analytics',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
      label: 'Analytics',
      show: true
    },
    {
      path: '/chat-bot',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v4" />
          <line x1="8" y1="16" x2="8" y2="16" />
          <line x1="16" y1="16" x2="16" y2="16" />
        </svg>
      ),
      label: 'Chat Bot',
      show: user?.role === 'admin'
    },
    {
      path: '/team',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      label: 'Team',
      show: user?.role === 'admin'
    },
    {
      path: '/settings',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
      label: 'Settings',
      show: true
    }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_17_416)">
                <path d="M23.9063 8.43749C21.5391 8.43632 19.2319 9.18186 17.313 10.568C15.3942 11.9541 13.9614 13.9102 13.2188 16.1578C13.1663 16.3395 13.0778 16.5088 12.9584 16.6556C12.8391 16.8023 12.6913 16.9234 12.5241 17.0117C12.3568 17.1 12.1734 17.1537 11.9849 17.1695C11.7965 17.1853 11.6067 17.1629 11.4271 17.1036C11.2475 17.0444 11.0816 16.9495 10.9395 16.8247C10.7974 16.6999 10.6819 16.5476 10.6 16.3772C10.5181 16.2067 10.4714 16.0214 10.4628 15.8325C10.4541 15.6435 10.4837 15.4548 10.5497 15.2775C11.5259 12.3294 13.4502 9.78725 16.0225 8.04728C18.5947 6.30732 21.6704 5.46738 24.77 5.65842C27.8697 5.84945 30.8189 7.06073 33.1581 9.10339C35.4972 11.1461 37.0947 13.9053 37.7016 16.9509C39.8229 17.2375 41.7561 18.3196 43.1094 19.9781C44.4628 21.6366 45.1351 23.7476 44.9903 25.8833C44.8455 28.019 43.8943 30.0198 42.3295 31.4805C40.7647 32.9412 38.7031 33.7524 36.5625 33.75H12.6563C12.2833 33.75 11.9256 33.6018 11.6619 33.3381C11.3982 33.0744 11.25 32.7167 11.25 32.3437C11.25 31.9708 11.3982 31.6131 11.6619 31.3494C11.9256 31.0856 12.2833 30.9375 12.6563 30.9375H36.5625C38.0543 30.9379 39.4852 30.3456 40.5404 29.291C41.5955 28.2363 42.1885 26.8057 42.1889 25.3139C42.1893 23.822 41.597 22.3912 40.5424 21.336C39.4878 20.2809 38.0572 19.6879 36.5653 19.6875H36.4922C36.1445 19.6896 35.8084 19.5629 35.5487 19.3317C35.2891 19.1006 35.1242 18.7815 35.0859 18.4359C34.7781 15.6862 33.4678 13.1464 31.4054 11.3019C29.343 9.45738 26.6731 8.43761 23.9063 8.43749ZM0 21.0937C0 20.7208 0.148158 20.3631 0.411881 20.0994C0.675604 19.8356 1.03329 19.6875 1.40625 19.6875H15.4688C15.8417 19.6875 16.1994 19.8356 16.4631 20.0994C16.7268 20.3631 16.875 20.7208 16.875 21.0937C16.875 21.4667 16.7268 21.8244 16.4631 22.0881C16.1994 22.3518 15.8417 22.5 15.4688 22.5H1.40625C1.03329 22.5 0.675604 22.3518 0.411881 22.0881C0.148158 21.8244 0 21.4667 0 21.0937ZM5.625 26.7187C5.625 26.3458 5.77316 25.9881 6.03688 25.7244C6.3006 25.4606 6.65829 25.3125 7.03125 25.3125H32.3438C32.7167 25.3125 33.0744 25.4606 33.3381 25.7244C33.6018 25.9881 33.75 26.3458 33.75 26.7187C33.75 27.0917 33.6018 27.4494 33.3381 27.7131C33.0744 27.9768 32.7167 28.125 32.3438 28.125H7.03125C6.65829 28.125 6.3006 27.9768 6.03688 27.7131C5.77316 27.4494 5.625 27.0917 5.625 26.7187ZM0 37.9687C0 37.5958 0.148158 37.2381 0.411881 36.9744C0.675604 36.7106 1.03329 36.5625 1.40625 36.5625H26.7188C27.0917 36.5625 27.4494 36.7106 27.7131 36.9744C27.9768 37.2381 28.125 37.5958 28.125 37.9687C28.125 38.3417 27.9768 38.6994 27.7131 38.9631C27.4494 39.2268 27.0917 39.375 26.7188 39.375H1.40625C1.03329 39.375 0.675604 39.2268 0.411881 38.9631C0.148158 38.6994 0 38.3417 0 37.9687Z" fill="#184E7F" />
              </g>
              <defs>
                <clipPath id="clip0_17_416">
                  <rect width="45" height="45" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <span className="logo-text">Hubly</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) =>
          item.show ? (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </NavLink>
          ) : null
        )}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user?.name}</div>
            <div className="sidebar-user-role">{user?.role}</div>
          </div>
        </div>
        <button className="sidebar-logout" onClick={handleLogout} title="Logout">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;