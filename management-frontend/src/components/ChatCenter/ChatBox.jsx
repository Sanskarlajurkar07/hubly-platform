import React, { useState, useEffect } from 'react';
import { messageAPI } from '../../api/messageAPI';
import userAvatar from '../../assets/image.svg';

const ChatBox = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (chatId) {
      fetchMessages();
    }
  }, [chatId]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await messageAPI.getMessages(chatId);
      setMessages(response.data || []);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !chatId) return;

    try {
      await messageAPI.sendMessage(chatId, { content: newMessage });
      setNewMessage('');
      await fetchMessages();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  if (!chatId) {
    return <div className="chat-main empty-chat-state">Select a conversation to start</div>;
  }

  return (
    <div className="chat-main">
      <div className="chat-main-header">
        <h3>Chat</h3>
      </div>
      <div className="chat-messages-area">
        {loading ? (
          <div className="loading">Loading messages...</div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`message-row ${msg.sender === 'you' ? 'agent' : 'customer'}`}>
              <div className={`message-avatar ${msg.sender === 'you' ? 'agent' : 'customer'}`}>
                <img src={userAvatar} alt="User" />
              </div>
              <div className="message-content">
                <div className="sender-name">{msg.sender === 'you' ? 'You' : 'Customer'}</div>
                <div className="bubble">
                  {msg.content}
                </div>
                <span className="message-time">{msg.timestamp}</span>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="chat-input-wrapper">
        <form className="chat-input-box" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit" className="send-btn">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
