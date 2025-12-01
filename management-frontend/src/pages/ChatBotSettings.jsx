import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import botAvatar from '../assets/Ellipse 6.svg';
import '../styles/ChatBotSettings.css';

const ChatBotSettings = () => {
    const [config, setConfig] = useState({
        headerColor: '#3B82F6',
        backgroundColor: '#FFFFFF',
        initialMessage: 'How can i help you?',
        secondaryMessage: 'Ask me anything!',
        welcomeMessage: "👋 Want to chat about Hubly? I'm an chatbot here to help you find your way.",
        introForm: {
            nameLabel: 'Your name',
            phoneLabel: 'Your Phone',
            emailLabel: 'Your Email'
        }
    });

    const [timer, setTimer] = useState({
        hours: 0,
        minutes: 10,
        seconds: 0
    });

    const { user } = useAuth();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await api.get('/settings');
                if (res.data) {
                    if (res.data.chatBotConfig) {
                        setConfig(prev => ({ ...prev, ...res.data.chatBotConfig }));
                    }
                    if (res.data.missedChatTimer) {
                        setTimer({ hours: 0, minutes: res.data.missedChatTimer, seconds: 0 });
                    }
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

    const handleFormLabelChange = (field, value) => {
        setConfig({
            ...config,
            introForm: {
                ...config.introForm,
                [field]: value
            }
        });
    };

    const handleColorSelect = (name, color) => {
        setConfig({ ...config, [name]: color });
    }

    const handleSave = async () => {
        try {
            await api.put('/settings', {
                chatBotConfig: config,
                missedChatTimer: parseInt(timer.minutes),
            });
            alert('Settings updated successfully!');
        } catch (error) {
            alert('Failed to update settings');
        }
    };

    return (
        <div className="chatbot-settings-page">
            <h1>Chat Bot</h1>

            <div className="chatbot-layout">
                {/* Preview Section */}
                <div className="preview-section">
                    <div className="phone-mockup">
                        <div className="mockup-header" style={{ backgroundColor: config.headerColor }}>
                            <div className="mockup-avatar">
                                <img src={botAvatar} alt="Bot" />
                            </div>
                            <span>Hubly</span>
                        </div>
                        <div className="mockup-body" style={{ backgroundColor: config.backgroundColor }}>
                            <div className="mockup-message received">
                                {config.initialMessage}
                            </div>
                            <div className="mockup-message received">
                                {config.secondaryMessage}
                            </div>

                            <div className="mockup-form">
                                <h4>Introduction Yourself</h4>
                                <input type="text" placeholder={config.introForm.nameLabel} disabled />
                                <input type="text" placeholder={config.introForm.phoneLabel} disabled />
                                <input type="text" placeholder={config.introForm.emailLabel} disabled />
                                <button style={{ backgroundColor: config.headerColor }}>Thank You!</button>
                            </div>
                        </div>
                        <div className="mockup-footer">
                            <span>Write a message</span>
                            <span>➤</span>
                        </div>
                    </div>

                    {/* Floating Icon Preview */}
                    <div className="floating-preview">
                        <div className="pop-tooltip">
                            {config.welcomeMessage}
                            <span className="close-x">×</span>
                        </div>
                        <div className="floating-icon" style={{ backgroundColor: config.headerColor }}>
                            <img src={botAvatar} alt="Bot" />
                        </div>
                    </div>
                </div>

                {/* Controls Section */}
                <div className="controls-section">

                    <div className="control-card">
                        <h3>Header Color</h3>
                        <div className="color-options">
                            {['#FFFFFF', '#000000', '#1e293b', '#3B82F6'].map(c => (
                                <div
                                    key={c}
                                    className={`color-circle ${config.headerColor === c ? 'selected' : ''}`}
                                    style={{ backgroundColor: c, border: c === '#FFFFFF' ? '1px solid #ddd' : 'none' }}
                                    onClick={() => handleColorSelect('headerColor', c)}
                                />
                            ))}
                        </div>
                        <div className="hex-input">
                            <div className="color-preview-box" style={{ backgroundColor: config.headerColor }}></div>
                            <input
                                type="text"
                                name="headerColor"
                                value={config.headerColor}
                                onChange={handleConfigChange}
                            />
                        </div>
                    </div>

                    <div className="control-card">
                        <h3>Custom Background Color</h3>
                        <div className="color-options">
                            {['#FFFFFF', '#000000', '#f8fafc'].map(c => (
                                <div
                                    key={c}
                                    className={`color-circle ${config.backgroundColor === c ? 'selected' : ''}`}
                                    style={{ backgroundColor: c, border: c === '#FFFFFF' ? '1px solid #ddd' : 'none' }}
                                    onClick={() => handleColorSelect('backgroundColor', c)}
                                />
                            ))}
                        </div>
                        <div className="hex-input">
                            <div className="color-preview-box" style={{ backgroundColor: config.backgroundColor }}></div>
                            <input
                                type="text"
                                name="backgroundColor"
                                value={config.backgroundColor}
                                onChange={handleConfigChange}
                            />
                        </div>
                    </div>

                    <div className="control-card">
                        <h3>Customize Message</h3>
                        <div className="input-group">
                            <input
                                type="text"
                                name="initialMessage"
                                value={config.initialMessage}
                                onChange={handleConfigChange}
                                placeholder="Initial Message"
                            />
                            <span className="edit-icon">✎</span>
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                name="secondaryMessage"
                                value={config.secondaryMessage}
                                onChange={handleConfigChange}
                                placeholder="Secondary Message"
                            />
                            <span className="edit-icon">✎</span>
                        </div>
                    </div>

                    <div className="control-card">
                        <h3>Introduction Form</h3>
                        <div className="form-config-list">
                            <div className="form-config-item">
                                <label>Your name</label>
                                <input
                                    type="text"
                                    value={config.introForm.nameLabel}
                                    onChange={(e) => handleFormLabelChange('nameLabel', e.target.value)}
                                    className="underlined-input"
                                />
                            </div>
                            <div className="form-config-item">
                                <label>Your Phone</label>
                                <input
                                    type="text"
                                    value={config.introForm.phoneLabel}
                                    onChange={(e) => handleFormLabelChange('phoneLabel', e.target.value)}
                                    className="underlined-input"
                                />
                            </div>
                            <div className="form-config-item">
                                <label>Your Email</label>
                                <input
                                    type="text"
                                    value={config.introForm.emailLabel}
                                    onChange={(e) => handleFormLabelChange('emailLabel', e.target.value)}
                                    className="underlined-input"
                                />
                            </div>
                            <button className="preview-submit-btn" style={{ backgroundColor: '#1e40af' }}>Thank You!</button>
                        </div>
                    </div>

                    <div className="control-card">
                        <h3>Welcome Message</h3>
                        <div className="input-group textarea-group">
                            <span className="char-count">18/50</span>
                            <textarea
                                name="welcomeMessage"
                                value={config.welcomeMessage}
                                onChange={handleConfigChange}
                                rows="3"
                            />
                            <span className="edit-icon">✎</span>
                        </div>
                    </div>

                    <div className="control-card">
                        <h3>Missed chat timer</h3>
                        <div className="timer-inputs">
                            <div className="time-col">
                                <label>12</label>
                                <input type="text" value="00" readOnly className="timer-box" />
                            </div>
                            <span className="timer-colon">:</span>
                            <div className="time-col">
                                <label>09</label>
                                <input type="text" value={timer.minutes} onChange={(e) => setTimer({ ...timer, minutes: e.target.value })} className="timer-box" />
                            </div>
                            <span className="timer-colon">:</span>
                            <div className="time-col">
                                <label>59</label>
                                <input type="text" value="00" readOnly className="timer-box" />
                            </div>
                        </div>
                        <div className="timer-labels">
                            <span>01</span>
                            <span>11</span>
                            <span>01</span>
                        </div>
                        <div className="save-action">
                            <button onClick={handleSave}>Save</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ChatBotSettings;
