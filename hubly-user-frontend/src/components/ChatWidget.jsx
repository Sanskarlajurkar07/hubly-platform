import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import styles from './ChatWidget/ChatWidget.module.css';
import chatIcon from '../assets/chaticon.svg';
import Avatar from '../assets/Avater/Avater.svg';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState('intro'); // intro, chat, thank_you
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [ticket, setTicket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [settings, setSettings] = useState({
        headerColor: '#33475B',
        backgroundColor: '#FFFFFF',
        initialMessage: 'Hello! How can we help you?',
        popMessageText: 'Chat with us!',
    });
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await api.get('/settings');
                if (res.data && res.data.chatBotConfig) {
                    setSettings(res.data.chatBotConfig);
                }
            } catch (error) {
                console.error('Failed to fetch settings', error);
            }
        };
        fetchSettings();

        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (ticket && step === 'chat') {
            const fetchMessages = async () => {
                try {
                    const res = await api.get(`/tickets/${ticket._id}/messages`);
                    setMessages(res.data);
                } catch (error) {
                    console.error('Failed to fetch messages', error);
                }
            };
            fetchMessages();
            const interval = setInterval(fetchMessages, 3000);
            return () => clearInterval(interval);
        }
    }, [ticket, step]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
        setShowPopup(false);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleIntroSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/tickets', formData);
            setTicket(res.data);
            setStep('thank_you');
            setTimeout(() => setStep('chat'), 2000);
        } catch (error) {
            console.error('Failed to create ticket', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            await api.post(`/tickets/${ticket._id}/messages`, {
                text: newMessage,
                sender: 'customer',
            });
            setNewMessage('');
            const res = await api.get(`/tickets/${ticket._id}/messages`);
            setMessages(res.data);
        } catch (error) {
            console.error('Failed to send message', error);
        }
    };

    return (
        <div className={styles.chatWidget}>
            {/* Popup Message */}
            {showPopup && !isOpen && (
                <div className={styles.popupMessage}>
                    <button className={styles.popupClose} onClick={() => setShowPopup(false)}>×</button>
                    <div className={styles.popupAvatar}>
                        <img src={Avatar} alt="Hubly bot" />
                    </div>
                    <p>{settings.popMessageText || settings.popMessage || 'Chat with us!'}</p>
                </div>
            )}

            {/* Chat Box */}
            {isOpen && (
                <div className={styles.chatBox}>
                    <div className={styles.chatHeader} style={{ backgroundColor: settings.headerColor }}>
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
                        <button className={styles.closeBtn} onClick={toggleChat}>×</button>
                    </div>

                    <div className={styles.chatBody} style={{ backgroundColor: settings.backgroundColor }}>
                        {step === 'intro' && (
                            <>
                                <div className={styles.greetingBubble}>
                                    <span>{settings.initialMessage}</span>
                                </div>
                                <div className={styles.formCard}>
                                    <div className={styles.formAvatar}>
                                        <img src={Avatar} alt="Hubly assistant avatar" />
                                    </div>
                                    <p className={styles.formTitle}>Introduction Yourself</p>
                                    <form onSubmit={handleIntroSubmit}>
                                        <div className={styles.formGroup}>
                                            <label>Your name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Your Phone</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="+1 (000) 000-0000"
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Your Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Your Email"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className={styles.submitBtn}
                                            disabled={loading}
                                            style={{ backgroundColor: settings.headerColor }}
                                        >
                                            {loading ? 'Submitting...' : 'Start Chat'}
                                        </button>
                                    </form>
                                </div>
                            </>
                        )}

                        {step === 'thank_you' && (
                            <div className={styles.formCard}>
                                <div className={styles.thankYouMessage}>
                                    <p>Thank you!</p>
                                    <span>Our team will get back to you soon.</span>
                                </div>
                            </div>
                        )}

                        {step === 'chat' && (
                            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '10px' }}>
                                {messages.map((msg, index) => (
                                    <div key={index} style={{
                                        alignSelf: msg.sender === 'customer' ? 'flex-end' : 'flex-start',
                                        backgroundColor: msg.sender === 'customer' ? settings.headerColor : '#ffffff',
                                        color: msg.sender === 'customer' ? '#ffffff' : '#333',
                                        padding: '10px 14px',
                                        borderRadius: '12px',
                                        maxWidth: '80%',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                        borderBottomRightRadius: msg.sender === 'customer' ? '2px' : '12px',
                                        borderBottomLeftRadius: msg.sender === 'customer' ? '12px' : '2px',
                                    }}>
                                        {msg.text}
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    <div className={styles.chatFooter}>
                        <form onSubmit={handleSendMessage} style={{ display: 'flex', width: '100%', gap: '10px' }}>
                            <input
                                type="text"
                                placeholder="Write a message"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                disabled={step !== 'chat'}
                            />
                            <button type="submit" disabled={step !== 'chat'} style={{ backgroundColor: settings.headerColor }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Floating Icon */}
            <button
                className={`${styles.chatIcon} ${isOpen ? styles.chatIconOpen : ''}`}
                onClick={toggleChat}
                style={{ backgroundColor: settings.headerColor }}
            >
                {isOpen ? (
                    <span className={styles.closeIcon}>×</span>
                ) : (
                    <svg width="36" height="36" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_3531_604)">
                            <path fillRule="evenodd" clipRule="evenodd" d="M44.7162 18.489C44.4616 16.9136 43.5114 15.965 41.9805 15.7485C41.9432 15.7395 38.2151 15.0244 32.3643 15.0244C26.5151 15.0244 22.787 15.7395 22.7619 15.7452C21.5643 15.9155 20.7292 16.5293 20.2954 17.5225C22.8025 17.2454 25.3233 17.1092 27.8457 17.1147C33.5165 17.1147 37.2892 17.7666 37.843 17.8687C40.3395 18.2433 42.0754 19.9752 42.4954 22.5131C42.677 23.3401 43.2511 26.2477 43.2511 29.7187C43.2511 31.5771 43.0841 33.2823 42.9041 34.5852C43.8932 34.1668 44.516 33.3285 44.7122 32.1171C44.7187 32.0871 45.4362 29.0247 45.4362 25.2941C45.4362 21.5644 44.7187 18.502 44.7146 18.4882" fill="white" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M40.1976 22.9135C39.943 21.3373 38.9919 20.3886 37.4619 20.1713C37.4246 20.1632 33.6965 19.4497 27.8465 19.4497C21.9973 19.4497 18.2684 20.1632 18.244 20.1697C16.7011 20.3886 15.7508 21.3373 15.5003 22.8965C15.4921 22.9265 14.7754 25.9889 14.7754 29.7194C14.7754 33.4492 15.4921 36.5116 15.4962 36.5246C15.7508 38.1008 16.7011 39.0494 18.2319 39.2667C18.2619 39.2724 20.6805 39.7354 24.664 39.9162L27.0381 44.0286C27.12 44.1706 27.2378 44.2885 27.3797 44.3704C27.5216 44.4524 27.6826 44.4955 27.8465 44.4955C28.0103 44.4955 28.1713 44.4524 28.3132 44.3704C28.4551 44.2885 28.573 44.1706 28.6549 44.0286L31.0297 39.917C35.0132 39.7354 37.4294 39.2732 37.4497 39.2684C38.9919 39.0494 39.943 38.1008 40.1935 36.5416C40.2016 36.5116 40.9176 33.4492 40.9176 29.7194C40.9176 25.9889 40.2008 22.9265 40.1976 22.9135Z" fill="white" />
                        </g>
                        <defs>
                            <clipPath id="clip0_3531_604">
                                <rect width="32" height="30" fill="white" transform="translate(14 15)" />
                            </clipPath>
                        </defs>
                    </svg>
                )}
            </button>
        </div>
    );
};

export default ChatWidget;
