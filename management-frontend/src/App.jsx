import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ChatCenter from './pages/ChatCenter';
import Analytics from './pages/Analytics';
import ChatBotSettings from './pages/ChatBotSettings';
import ProfileSettings from './pages/ProfileSettings';
import Team from './pages/Team';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/global.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/chat-center" element={<ChatCenter />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<ChatBotSettings />} />
                <Route path="/profile" element={<ProfileSettings />} />
                <Route path="/team" element={<Team />} />
              </Route>
            </Route>

            {/* Redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;