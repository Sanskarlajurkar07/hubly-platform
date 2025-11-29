import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NewLogo from '../assets/NewLogo.svg';
import FrameImage from '../assets/Frame.svg';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validation
        if (!email || !password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        try {
            await login({ email, password });
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page-wrapper">
            <div className="login-main-container">
                {/* Left Side - Form Section */}
                <div className="login-left-section">
                    <div className="login-content">
                        <div className="brand-logo">
                            <img src={NewLogo} alt="Hubly" />
                        </div>

                        <div className="login-header">
                            <h1>Sign in to your Plexify</h1>
                        </div>

                        <form onSubmit={handleSubmit} className="login-form-fields">
                            <div className="input-group">
                                <label>Username</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="rounded-input"
                                />
                            </div>

                            <div className="input-group">
                                <label>Password</label>
                                <div className="password-wrapper">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="rounded-input"
                                    />
                                    <button
                                        type="button"
                                        className="eye-icon-btn"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                                <line x1="1" y1="1" x2="23" y2="23"></line>
                                            </svg>
                                        ) : (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                <circle cx="12" cy="12" r="3"></circle>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {error && <div className="error-text">{error}</div>}

                            <button type="submit" className="signin-btn" disabled={loading}>
                                {loading ? 'Logging in...' : 'Log in'}
                            </button>

                            <div className="signup-link">
                                Don't have an account? <Link to="/signup">Sign up</Link>
                            </div>
                        </form>

                        <div className="recaptcha-text">
                            This site is protected by reCAPTCHA and the <a href="#">Google Privacy Policy</a> and <a href="#">Terms of Service</a> apply.
                        </div>
                    </div>
                </div>

                {/* Right Side - Image Section */}
                <div className="login-right-section">
                    <img
                        src={FrameImage}
                        alt="Hero"
                        className="hero-image"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
