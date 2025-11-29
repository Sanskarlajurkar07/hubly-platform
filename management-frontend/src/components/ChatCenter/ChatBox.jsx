import React, { useState, useEffect } from 'react';
import { messageAPI } from '../../api/messageAPI';

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
    return <div className="chat-box empty">Select a conversation to start</div>;
  }

  return (
    <div className="chat-box">
      <div className="chat-messages">
        {loading ? (
          <div className="loading">Loading messages...</div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender === 'you' ? 'sent' : 'received'}`}>
              <div className="message-content">{msg.content}</div>
              <span className="message-time">{msg.timestamp}</span>
            </div>
          ))
        )}
      </div>
      <form className="chat-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="chat-input"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="send-btn">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;
