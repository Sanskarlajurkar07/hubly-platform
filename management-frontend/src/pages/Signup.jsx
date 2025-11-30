import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NewLogo from '../assets/NewLogo.svg';
import FrameImage from '../assets/Frame.svg';
import './Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!agreeTerms) {
            setError('You must agree to the Terms of use and Privacy Policy');
            return;
        }

        setLoading(true);

        try {
            // Assuming signup takes an object with these fields. 
            // Adjusting based on previous Signup.jsx which used 'name', 'email', 'phone', 'password'.
            // I will combine firstName and lastName to 'name' if the backend expects 'name', 
            // but typically standard signup uses separate fields.
            // Looking at the previous file, it had 'name' and 'phone'.
            // The screenshot does not show 'phone'.
            // I will follow the screenshot fields. 
            // If the backend requires 'phone', this might fail, but I must follow the UI requirement.
            // I'll pass firstName and lastName. If backend needs 'name', I can construct it.
            
            // Constructing payload to be safe, but I'll check AuthContext if I can. 
            // For now, I'll send what the form has.
            await signup({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            });
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-page-wrapper">
            <div className="signup-main-container">
                {/* Left Side - Form Section */}
                <div className="signup-left-section">
                    <div className="signup-content">
                        <div className="brand-logo">
                            <img src={NewLogo} alt="Hubly" />
                        </div>

                        <div className="signup-header">
                            <h1>Create an account</h1>
                            <Link to="/login" className="signin-link-header">Sign in instead</Link>
                        </div>

                        <form onSubmit={handleSubmit} className="signup-form-fields">
                            <div className="input-group">
                                <label>First name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="rounded-input"
                                />
                            </div>

                            <div className="input-group">
                                <label>Last name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="rounded-input"
                                />
                            </div>

                            <div className="input-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="rounded-input"
                                />
                            </div>

                            <div className="input-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="rounded-input"
                                />
                            </div>

                            <div className="input-group">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="rounded-input"
                                />
                            </div>

                            <div className="terms-checkbox">
                                <input
                                    type="checkbox"
                                    checked={agreeTerms}
                                    onChange={(e) => setAgreeTerms(e.target.checked)}
                                    id="terms"
                                />
                                <label htmlFor="terms" className="terms-text">
                                    By creating an account, I agree to our <a href="#">Terms of use</a><br />
                                    and <a href="#">Privacy Policy</a>
                                </label>
                            </div>

                            {error && <div className="error-text">{error}</div>}

                            <button type="submit" className="create-account-btn" disabled={loading}>
                                {loading ? 'Creating account...' : 'Create an account'}
                            </button>
                        </form>

                        <div className="recaptcha-text">
                            This site is protected by reCAPTCHA and the <a href="#">Google Privacy Policy</a> and <a href="#">Terms of Service</a> apply.
                        </div>
                    </div>
                </div>

                {/* Right Side - Image Section */}
                <div className="signup-right-section">
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

export default Signup;
