import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalTickets: 0,
    resolvedTickets: 0,
    unresolvedTickets: 0,
  });
  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState('All Tickets'); // All Tickets, Resolved, Unresolved
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch Stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/dashboard/stats');
        setStats(res.data);
      } catch (error) {
        console.error('Failed to fetch stats', error);
      }
    };
    fetchStats();
  }, []);

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
        <input
          type="text"
          placeholder="Search for ticket"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="main-search-input"
        />
      </div>

      <div className="tabs-nav">
        <button
          className={activeTab === 'All Tickets' ? 'active' : ''}
          onClick={() => handleTabChange('All Tickets')}
        >
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
          <div className="no-tickets">No tickets found</div>
        ) : (
          tickets.map(ticket => (
            <div key={ticket._id} className="ticket-card-item">
              <div className="ticket-card-header">
                <span className="ticket-id-badge">Ticket# {ticket.ticketId}</span>
                <span className="ticket-date">Posted at {new Date(ticket.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="ticket-card-body">
                <h3>{ticket.customer?.name || 'Unknown User'}</h3>
                <div className="ticket-status-time">
                  <span className={`status-pill ${ticket.status.toLowerCase().replace(' ', '-')}`}>{ticket.status}</span>
                </div>
              </div>
              <div className="ticket-card-footer">
                <div className="user-info">
                  <div className="user-avatar">{ticket.customer?.name?.charAt(0) || '?'}</div>
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