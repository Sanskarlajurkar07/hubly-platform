import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import '../styles/ProfileSettings.css';

const ProfileSettings = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (user) {
            // Split name for demo purposes if needed, or just use name field
            const names = user.name.split(' ');
            setFormData(prev => ({
                ...prev,
                firstName: names[0] || '',
                lastName: names.slice(1).join(' ') || '',
                email: user.email
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        // Implement profile update logic
        // Note: Backend might need update to support separate first/last name or we combine them.
        // Also password change logic.
        alert('Profile update logic to be implemented based on backend support.');
    }

    return (
        <div className="profile-settings-page">
            <h1>Settings</h1>

            <div className="settings-container">
                <div className="tabs">
                    <button className="active">Edit Profile</button>
                    {/* <button>Preferences</button> */}
                    {/* <button>Security</button> */}
                </div>

                <div className="form-section">
                    <div className="row">
                        <div className="form-group">
                            <label>First name</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label>Last name</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" value={formData.email} readOnly />
                            <span className="info-icon">ⓘ</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="************" />
                            <span className="info-icon">ⓘ</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="************" />
                            <span className="info-icon">ⓘ</span>
                        </div>
                    </div>

                    <div className="logout-warning">
                        User will logged out immediately
                    </div>

                    <div className="actions">
                        <button className="save-btn" onClick={handleSave}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
