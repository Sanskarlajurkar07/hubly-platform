import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import '../styles/settings.css';

const Settings = () => {
  const [config, setConfig] = useState({
    headerColor: '#3B82F6',
    backgroundColor: '#FFFFFF',
    initialMessage: '',
    popMessageText: '',
  });
  const [timer, setTimer] = useState(5);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data) {
          if (res.data.chatBotConfig) setConfig(res.data.chatBotConfig);
          if (res.data.missedChatTimer) setTimer(res.data.missedChatTimer);
        }
      } catch (error) {
        console.error('Failed to fetch settings', error);
      }
    };
    fetchSettings();
  }, []);

  const handleConfigChange = (e) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/settings', {
        chatBotConfig: config,
        missedChatTimer: timer,
      });
      alert('Settings updated successfully!');
    } catch (error) {
      alert('Failed to update settings');
    }
  };

  if (user.role !== 'admin') {
    return <div className="settings-page"><h2>Access Denied</h2><p>Only Admins can modify settings.</p></div>;
  }

  return (
    <div className="settings-page">
      <h1>Chat Bot Settings</h1>

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="section">
          <h3>Appearance</h3>
          <div className="form-group">
            <label>Header Color</label>
            <div className="color-input">
              <input type="color" name="headerColor" value={config.headerColor} onChange={handleConfigChange} />
              <input type="text" name="headerColor" value={config.headerColor} onChange={handleConfigChange} />
            </div>
          </div>
          <div className="form-group">
            <label>Background Color</label>
            <div className="color-input">
              <input type="color" name="backgroundColor" value={config.backgroundColor} onChange={handleConfigChange} />
              <input type="text" name="backgroundColor" value={config.backgroundColor} onChange={handleConfigChange} />
            </div>
          </div>
        </div>

        <div className="section">
          <h3>Messages</h3>
          <div className="form-group">
            <label>Initial Message</label>
            <input type="text" name="initialMessage" value={config.initialMessage} onChange={handleConfigChange} />
          </div>
          <div className="form-group">
            <label>Pop Message Text</label>
            <input type="text" name="popMessageText" value={config.popMessageText} onChange={handleConfigChange} />
          </div>
        </div>

        <div className="section">
          <h3>Configuration</h3>
          <div className="form-group">
            <label>Missed Chat Timer (minutes)</label>
            <input type="number" value={timer} onChange={(e) => setTimer(e.target.value)} />
          </div>
        </div>

        <button type="submit" className="save-btn">Save Changes</button>
      </form>
    </div>
  );
};

export default Settings;