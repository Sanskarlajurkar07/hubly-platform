import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState('All Tickets'); // All Tickets, Resolved, Unresolved
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch Tickets with Pagination & Filter
  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        let status = '';
        if (activeTab === 'Resolved') status = 'Resolved';
        if (activeTab === 'Unresolved') status = 'Open';

        const res = await api.get(`/tickets?pageNumber=${page}&keyword=${searchId}&status=${status}`);
        setTickets(res.data.tickets);
        setTotalPages(res.data.pages);
      } catch (error) {
        console.error('Failed to fetch tickets', error);
      }
      setLoading(false);
    };

    // Debounce search
    const timeoutId = setTimeout(() => {
      fetchTickets();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [page, searchId, activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
    setSearchId('');
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="search-bar-container">
        <div className="search-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search for ticket"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="main-search-input"
          />
        </div>
      </div>

      <div className="tabs-nav">
        <button
          className={activeTab === 'All Tickets' ? 'active' : ''}
          onClick={() => handleTabChange('All Tickets')}
        >
          <span className="tab-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </span>
          All Tickets
        </button>
        <button
          className={activeTab === 'Resolved' ? 'active' : ''}
          onClick={() => handleTabChange('Resolved')}
        >
          Resolved
        </button>
        <button
          className={activeTab === 'Unresolved' ? 'active' : ''}
          onClick={() => handleTabChange('Unresolved')}
        >
          Unresolved
        </button>
      </div>

      <div className="tickets-list-container">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : tickets.length === 0 ? (
          searchId ? (
            <div className="ticket-not-found">
              <p>Ticket not found</p>
              <small>No ticket matches ID "{searchId}"</small>
            </div>
          ) : (
            <div className="no-tickets">No tickets found</div>
          )
        ) : (
          tickets.map(ticket => (
            <div key={ticket._id} className="ticket-card-item">
              <div className="ticket-card-header">
                <div className="ticket-id-group">
                  <span className={`status-dot ${ticket.status.toLowerCase().replace(' ', '-')}`}></span>
                  <span className="ticket-id-badge">Ticket# {ticket.ticketId}</span>
                </div>
                <span className="ticket-date">Posted at {new Date(ticket.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
              </div>
              <div className="ticket-card-body">
                <h3>Hey!</h3> {/* Placeholder for message preview as per design */}
                <span className="message-time">10:00</span> {/* Placeholder time */}
              </div>
              <div className="ticket-card-footer">
                <div className="user-info">
                  <div className="user-avatar">
                    <img src={`https://ui-avatars.com/api/?name=${ticket.customer?.name}&background=random`} alt="avatar" />
                  </div>
                  <div className="user-details">
                    <span className="name">{ticket.customer?.name || 'Unknown User'}</span>
                    <span className="contact">{ticket.customer?.phone || 'No Phone'} • {ticket.customer?.email || 'No Email'}</span>
                  </div>
                </div>
                <button className="open-ticket-btn" onClick={() => window.location.href = `/chat-center`}>Open Ticket</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
          <span>Page {page} of {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;