import React, { useState, useEffect } from 'react';
import styles from './ChatWidget.module.css';
import api from '../../services/api';
import Avatar from '../../assets/Avater/Avater.svg';
import ChatIcon from '../../assets/chaticon.svg';

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
          <p>Chat with us!</p>
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
            <div className={styles.botMessage}>
              <div className={styles.botMessageAvatar}>
                <img src={Avatar} alt="Hubly bot" />
              </div>
              <div className={styles.botBubbleContainer}>
                <div className={styles.suggestionBubble}>How can i help you?</div>
                <div className={styles.suggestionBubble}>Ask me anything!</div>
              </div>
            </div>

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
          <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M29.9408 3.46459C29.6862 1.88919 28.736 0.940541 27.2052 0.724054C27.1679 0.715135 23.4397 0 17.5889 0C11.7397 0 8.01164 0.715135 7.98651 0.720811C6.78894 0.891081 5.9538 1.50486 5.52002 2.49811C8.02716 2.22095 10.5479 2.08479 13.0703 2.09027C18.7411 2.09027 22.5138 2.74216 23.0676 2.84432C25.5641 3.21892 27.3 4.95081 27.72 7.48865C27.9016 8.31568 28.4757 11.2232 28.4757 14.6943C28.4757 16.5527 28.3087 18.2578 28.1287 19.5608C29.1179 19.1424 29.7406 18.3041 29.9368 17.0927C29.9433 17.0627 30.6608 14.0003 30.6608 10.2697C30.6608 6.54 29.9433 3.47757 29.9392 3.46378" fill="white" />
            <path fillRule="evenodd" clipRule="evenodd" d="M25.4222 7.88908C25.1676 6.31286 24.2165 5.36421 22.6865 5.14691C22.6492 5.13881 18.9211 4.42529 13.0711 4.42529C7.22189 4.42529 3.49297 5.13881 3.46865 5.14529C1.92568 5.36421 0.975405 6.31286 0.724865 7.87205C0.716757 7.90205 0 10.9645 0 14.695C0 18.4248 0.716757 21.4872 0.720811 21.5002C0.975405 23.0764 1.92568 24.025 3.45649 24.2423C3.48649 24.248 5.90514 24.711 9.88865 24.8918L12.2627 29.0042C12.3446 29.1462 12.4624 29.264 12.6043 29.346C12.7462 29.428 12.9072 29.4711 13.0711 29.4711C13.235 29.4711 13.3959 29.428 13.5378 29.346C13.6798 29.264 13.7976 29.1462 13.8795 29.0042L16.2543 24.8926C20.2378 24.711 22.6541 24.2488 22.6743 24.2439C24.2165 24.025 25.1676 23.0764 25.4181 21.5172C25.4262 21.4872 26.1422 18.4248 26.1422 14.695C26.1422 10.9645 25.4254 7.90205 25.4222 7.88908Z" fill="white" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;