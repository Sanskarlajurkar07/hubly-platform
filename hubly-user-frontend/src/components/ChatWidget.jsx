import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import styles from './ChatWidget/ChatWidget.module.css';
import chatIcon from '../Group 2147223745.svg';
import Avatar from '../assets/Avater/Avater.svg';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState('intro'); // intro, chat, thank_you
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [ticket, setTicket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [settings, setSettings] = useState({
        headerColor: '#2C3E50',
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
                    <img src={chatIcon} alt="Chat" style={{ width: '60%', height: '60%', objectFit: 'contain' }} />
                )}
            </button>
        </div>
    );
};

export default ChatWidget;
