import React, { useState, useEffect, useRef } from 'react';
import api from '../api/axios';
import '../styles/ChatCenter.css';
import { useAuth } from '../context/AuthContext';
import defaultAvatar from '../assets/img.svg';

const ChatCenter = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [team, setTeam] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [pendingAssignment, setPendingAssignment] = useState(null);
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  // Fetch tickets (Chat List)
  const fetchTickets = async () => {
    try {
      const res = await api.get('/tickets');
      setTickets(res.data.tickets);
    } catch (error) {
      console.error('Failed to fetch tickets', error);
    }
  };

  useEffect(() => {
    fetchTickets();
    const interval = setInterval(fetchTickets, 10000); // Poll list every 10s
    return () => clearInterval(interval);
  }, []);

  // Fetch messages for selected ticket
  useEffect(() => {
    if (selectedTicket) {
      const fetchMessages = async () => {
        try {
          const res = await api.get(`/tickets/${selectedTicket._id}/messages`);
          setMessages(res.data);
        } catch (error) {
          console.error('Failed to fetch messages', error);
        }
      };
      fetchMessages();
      const interval = setInterval(fetchMessages, 3000); // Poll messages every 3s
      return () => clearInterval(interval);
    }
  }, [selectedTicket]);

  // Fetch team for assignment
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await api.get('/team');
        setTeam(res.data);
      } catch (error) {
        console.error('Failed to fetch team', error);
      }
    };
    fetchTeam();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedTicket) return;

    try {
      await api.post(`/tickets/${selectedTicket._id}/messages`, {
        text: newMessage,
        sender: 'agent',
        senderId: user._id,
      });
      setNewMessage('');
      // Refresh messages
      const res = await api.get(`/tickets/${selectedTicket._id}/messages`);
      setMessages(res.data);
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  const handleStatusChange = async (status) => {
    try {
      const res = await api.put(`/tickets/${selectedTicket._id}`, { status });
      setSelectedTicket(prev => ({ ...prev, status: res.data.status }));
      fetchTickets(); // Refresh list
    } catch (error) {
      console.error('Failed to update status', error);
    }
  }

  const initiateAssignment = (memberId) => {
    setPendingAssignment(memberId);
    setShowAssignModal(true);
  }

  const confirmAssignment = async () => {
    if (!pendingAssignment) return;
    try {
      const res = await api.put(`/tickets/${selectedTicket._id}`, { assignedTo: pendingAssignment });
      // Update local state
      const assignedUser = team.find(t => t._id === pendingAssignment);
      setSelectedTicket(prev => ({ ...prev, assignedTo: assignedUser }));
      fetchTickets();
      setShowAssignModal(false);
      setPendingAssignment(null);
    } catch (error) {
      console.error('Failed to assign ticket', error);
    }
  }

  return (
    <div className="chat-center-container">
      {/* Left Panel: Chat List */}
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <h2>Contact Center</h2>
        </div>
        <div className="chats-header">
          <span>Chats</span>
        </div>
        <div className="chat-list">
          {tickets.map(ticket => (
            <div
              key={ticket._id}
              className={`chat-item ${selectedTicket?._id === ticket._id ? 'active' : ''}`}
              onClick={() => setSelectedTicket(ticket)}
            >
              <div className="chat-item-avatar">
                <img src={defaultAvatar} alt="avatar" />
              </div>
              <div className="chat-item-info">
                <div className="chat-item-top">
                  <span className="chat-name">{ticket.customer?.name || 'Unknown'}</span>
                </div>
                <div className="chat-item-bottom">
                  <span className="chat-preview">Ticket# {ticket.ticketId}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Panel: Chat Interface */}
      <div className="chat-main">
        {selectedTicket ? (
          <>
            <div className="chat-main-header">
              <h3>Ticket# {selectedTicket.ticketId}</h3>
            </div>
            <div className="chat-messages-area">
              <div className="date-separator">
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              {messages.map((msg, idx) => (
                <div key={idx} className={`message-row ${msg.sender === 'agent' ? 'agent' : 'customer'}`}>
                  {msg.sender === 'customer' && (
                    <div className="message-avatar customer">
                      <img src={defaultAvatar} alt="customer" />
                    </div>
                  )}
                  <div className="message-content">
                    {msg.sender === 'agent' && <div className="sender-name">{user.name}</div>}
                    <div className="bubble">
                      {msg.text}
                    </div>
                  </div>
                  {msg.sender === 'agent' && (
                    <div className="message-avatar agent">
                      <img src={defaultAvatar} alt="agent" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="chat-input-wrapper">
              <form onSubmit={handleSendMessage} className="chat-input-box">
                <input
                  type="text"
                  placeholder="Type here..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" className="send-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="empty-chat-state">
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>

      {/* Right Panel: Details */}
      {selectedTicket && (
        <div className="chat-details-panel">
          <div className="details-header">
            <div className="details-avatar">
              <img src={defaultAvatar} alt="avatar" />
            </div>
            <span>{selectedTicket.customer?.name}</span>
          </div>

          <div className="details-section">
            <h4>Details</h4>
            <div className="detail-input-group">
              <span className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <input type="text" value={selectedTicket.customer?.name || ''} readOnly />
            </div>
            <div className="detail-input-group">
              <span className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              <input type="text" value={selectedTicket.customer?.phone || ''} readOnly />
            </div>
            <div className="detail-input-group">
              <span className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <input type="text" value={selectedTicket.customer?.email || ''} readOnly />
            </div>
          </div>

          <div className="details-section">
            <h4>Teammates</h4>
            <div className="custom-select-wrapper">
              <div className="select-icon">
                <img src={defaultAvatar} alt="user" style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
              </div>
              <select
                value={selectedTicket.assignedTo?._id || ''}
                onChange={(e) => initiateAssignment(e.target.value)}
                disabled={user.role !== 'admin'}
              >
                <option value="" disabled>Select Teammate</option>
                {team.map(member => (
                  <option key={member._id} value={member._id}>{member.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="details-section">
            <h4>Ticket status</h4>
            <div className="custom-select-wrapper">
              <div className="select-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <select
                value={selectedTicket.status}
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                <option value="Open">Unresolved (Open)</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Modal */}
      {showAssignModal && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <div className="modal-header-icon">
              <img src={defaultAvatar} alt="avatar" />
            </div>
            <h3>Chat would be assigned to Different team member</h3>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowAssignModal(false)}>Cancel</button>
              <button className="confirm-btn" onClick={confirmAssignment}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatCenter;