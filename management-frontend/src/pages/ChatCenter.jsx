import React, { useState, useEffect, useRef } from 'react';
import api from '../api/axios';
import '../styles/ChatCenter.css';
import { useAuth } from '../context/AuthContext';

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
                {ticket.customer?.name?.charAt(0) || '?'}
              </div>
              <div className="chat-item-info">
                <div className="chat-item-top">
                  <span className="chat-name">{ticket.customer?.name || 'Unknown'}</span>
                  {/* <span className="chat-time">10:00</span> */}
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
              <div className="header-actions">
                {/* Icons if needed */}
              </div>
            </div>
            <div className="chat-messages-area">
              <div className="date-separator">
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              {messages.map((msg, idx) => (
                <div key={idx} className={`message-row ${msg.sender === 'agent' ? 'agent' : 'customer'}`}>
                  {msg.sender === 'customer' && (
                    <div className="message-avatar customer">
                      {selectedTicket.customer?.name?.charAt(0)}
                    </div>
                  )}
                  <div className="message-content">
                    {msg.sender === 'agent' && <div className="sender-name">{user.name}</div>}
                    <div className="bubble">
                      {msg.text}
                    </div>
                    {/* <div className="message-time">10:00 AM</div> */}
                  </div>
                  {msg.sender === 'agent' && (
                    <div className="message-avatar agent">
                      {user.name?.charAt(0)}
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
                  ➤
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
              {selectedTicket.customer?.name?.charAt(0)}
            </div>
            <span>{selectedTicket.customer?.name}</span>
          </div>

          <div className="details-section">
            <h4>Details</h4>
            <div className="detail-input-group">
              <span className="input-icon">👤</span>
              <input type="text" value={selectedTicket.customer?.name || ''} readOnly />
            </div>
            <div className="detail-input-group">
              <span className="input-icon">📞</span>
              <input type="text" value={selectedTicket.customer?.phone || ''} readOnly />
            </div>
            <div className="detail-input-group">
              <span className="input-icon">✉️</span>
              <input type="text" value={selectedTicket.customer?.email || ''} readOnly />
            </div>
          </div>

          <div className="details-section">
            <h4>Teammates</h4>
            <div className="custom-select-wrapper">
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