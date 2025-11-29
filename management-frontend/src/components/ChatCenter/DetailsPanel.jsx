import { useState } from 'react';

function DetailsPanel({ ticket, teamMembers, onAssignTicket, onUpdateStatus, currentUser }) {
  const [showAssignDropdown, setShowAssignDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  if (!ticket) {
    return <div className="details-panel"></div>;
  }

  const assignedMember = teamMembers.find(m => m._id === ticket.assignedTo);
  const messageCount = 2; // This should come from actual message count

  const handleAssignClick = (member) => {
    if (member._id !== ticket.assignedTo) {
      setSelectedMember(member);
      setShowAssignModal(true);
      setShowAssignDropdown(false);
    }
  };

  const confirmAssign = () => {
    if (selectedMember) {
      onAssignTicket(selectedMember._id);
      setShowAssignModal(false);
      setSelectedMember(null);
    }
  };

  const handleStatusClick = (status) => {
    if (status !== ticket.status) {
      setSelectedStatus(status);
      setShowStatusModal(true);
      setShowStatusDropdown(false);
    }
  };

  const confirmStatus = () => {
    if (selectedStatus) {
      onUpdateStatus(selectedStatus);
      setShowStatusModal(false);
      setSelectedStatus(null);
    }
  };

  return (
    <div className="details-panel">
      <div className="details-panel-header">
        <div className="details-avatar">
          {ticket.userName?.charAt(0).toUpperCase()}
        </div>
        <span className="details-chat-label">Chat</span>
      </div>

      <div className="details-section">
        <h4 className="details-section-title">Details</h4>
        
        <div className="details-item">
          <div className="details-item-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="details-item-content">
            <div className="details-item-label">Contacts</div>
            <div className="details-item-value">{ticket.userName || 'Joe doe'}</div>
          </div>
          <span className="details-item-badge">{messageCount}</span>
        </div>

        <div className="details-item">
          <div className="details-item-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div className="details-item-content">
            <div className="details-item-value">{ticket.userPhone || '+1 (000) 000-0000'}</div>
          </div>
        </div>

        <div className="details-item">
          <div className="details-item-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="details-item-content">
            <div className="details-item-value">{ticket.userEmail || 'example@gmail.com'}</div>
          </div>
        </div>
      </div>

      <div className="details-section">
        <h4 className="details-section-title">Teammates</h4>
        
        <div className="details-dropdown-wrapper">
          <button
            className="details-dropdown-trigger"
            onClick={() => setShowAssignDropdown(!showAssignDropdown)}
          >
            <div className="details-dropdown-content">
              <div className="details-item-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span>{assignedMember?.name || 'Joe doe'}</span>
            </div>
            <svg className="details-dropdown-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showAssignDropdown && (
            <div className="details-dropdown-menu">
              {teamMembers.map((member) => (
                <button
                  key={member._id}
                  className="details-dropdown-item"
                  onClick={() => handleAssignClick(member)}
                >
                  <div className="dropdown-item-avatar">
                    {member.name?.charAt(0).toUpperCase()}
                  </div>
                  <span>{member.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="details-dropdown-wrapper">
          <button
            className="details-dropdown-trigger"
            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
          >
            <div className="details-dropdown-content">
              <div className="details-item-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span>Ticket status</span>
            </div>
            <svg className="details-dropdown-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showStatusDropdown && (
            <div className="details-dropdown-menu">
              <button
                className="details-dropdown-item-status"
                onClick={() => handleStatusClick('resolved')}
              >
                Resolved
              </button>
              <button
                className="details-dropdown-item-status"
                onClick={() => handleStatusClick('open')}
              >
                Unresolved
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Assignment Confirmation Modal */}
      {showAssignModal && (
        <div className="modal-overlay" onClick={() => setShowAssignModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p className="modal-text">
              Chat would be assigned to Different team member
            </p>
            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setShowAssignModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-confirm"
                onClick={confirmAssign}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Change Modal */}
      {showStatusModal && (
        <div className="modal-overlay" onClick={() => setShowStatusModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p className="modal-text">
              {selectedStatus === 'resolved' 
                ? 'Chat will be closed'
                : 'Chat will be reopened'}
            </p>
            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setShowStatusModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-confirm"
                onClick={confirmStatus}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsPanel;