import React, { useState, useEffect } from 'react';
import styles from './ChatWidget.module.css';
import api from '../../services/api';
import Avatar from '../../assets/Avater/Avater.svg';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [settings, setSettings] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch chat widget settings
    const fetchSettings = async () => {
      try {
        const response = await api.get('/settings');
        setSettings(response.data);
      } catch (error) {
        console.error('Error fetching settings:', error);
        // Set default settings if API fails
        setSettings({
          headerColor: '#2C3E50',
          backgroundColor: '#FFFFFF',
          initialMessage: 'Hi! How can we help you today?',
          namePlaceholder: 'Your name',
          emailPlaceholder: 'Your Email',
          phonePlaceholder: '+1 (000) 000-0000',
          popMessage: '👋 Want to chat about Hubly? I\'m an chatbot here to help you find your way.'
        });
      }
    };

    fetchSettings();

    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setShowPopup(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await api.post('/tickets/create', formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '' });
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!settings) return null;

  return (
    <div className={styles.chatWidget}>
      {/* Popup Message */}
      {showPopup && !isOpen && (
        <div className={styles.popupMessage}>
          <button
            className={styles.popupClose}
            onClick={() => setShowPopup(false)}
            aria-label="Close announcement"
          >
            ×
          </button>
          <div className={styles.popupAvatar}>
            <img src={Avatar} alt="Hubly bot" />
          </div>
          <p>{settings.popMessage}</p>
        </div>
      )}

      {/* Chat Box */}
      {isOpen && (
        <div className={styles.chatBox}>
          <div className={styles.chatHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.botAvatar}>
                <img src={Avatar} alt="Hubly bot" />
                <span className={styles.statusDot} />
              </div>
              <div>
                <p className={styles.brandName}>Hubly</p>
                <span className={styles.brandStatus}>We reply as fast as we can</span>
              </div>
            </div>
            <button
              className={styles.closeBtn}
              onClick={handleToggle}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className={styles.chatBody}>
            <div className={styles.greetingBubble}>
              <span>Hey!</span>
            </div>

            <div className={styles.formCard}>
              <div className={styles.formAvatar}>
                <img src={Avatar} alt="Hubly assistant avatar" />
              </div>

              {!isSubmitted ? (
                <>
                  <p className={styles.formTitle}>Introduction Yourself</p>
                  <div className={styles.formGroup}>
                    <label>Your name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={settings.namePlaceholder}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Your Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={settings.phonePlaceholder}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Your Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={settings.emailPlaceholder}
                    />
                  </div>
                  <button
                    className={styles.submitBtn}
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Thank You!'}
                  </button>
                </>
              ) : (
                <div className={styles.thankYouMessage}>
                  <p>Thank you!</p>
                  <span>Our team will get back to you soon.</span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.chatFooter}>
            <input
              type="text"
              placeholder="Write a message"
              disabled={!isSubmitted}
            />
            <button disabled={!isSubmitted} aria-label="Send message">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Chat Icon Button */}
      <button 
        className={`${styles.chatIcon} ${isOpen ? styles.chatIconOpen : ''}`}
        onClick={handleToggle}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <span className={styles.closeIcon}>×</span>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;