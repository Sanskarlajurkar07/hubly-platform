import userAvatar from '../../assets/image.svg';

function ChatList({ tickets, selectedTicket, onSelectTicket }) {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="chat-list">
      <div className="chat-list-header">
        <h3 className="chat-list-title">Chats</h3>
      </div>

      <div className="chat-list-items">
        {tickets.length === 0 ? (
          <div className="chat-list-empty">
            <p>No chats available</p>
          </div>
        ) : (
          tickets.map((ticket) => (
            <div
              key={ticket._id}
              className={`chat-item ${selectedTicket?._id === ticket._id ? 'active' : ''
                }`}
              onClick={() => onSelectTicket(ticket)}
            >
              <div className="chat-item-avatar">
                <img src={userAvatar} alt="User" />
              </div>
              <div className="chat-item-info">
                <div className="chat-item-top">
                  <span className="chat-name">
                    {ticket.userName || 'Chat ' + ticket.ticketId}
                  </span>
                  <span className="chat-time">
                    {formatTime(ticket.updatedAt || ticket.createdAt)}
                  </span>
                </div>
                <div className="chat-preview">
                  {ticket.lastMessage || ticket.status === 'resolved'
                    ? 'No longer have access'
                    : 'New ticket'}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ChatList;