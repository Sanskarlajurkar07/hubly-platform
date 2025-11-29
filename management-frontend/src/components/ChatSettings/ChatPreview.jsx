import React from 'react';

const ChatPreview = ({ settings }) => {
  return (
    <div className="chat-preview">
      <h3>Preview</h3>
      <div
        className="preview-container"
        style={{
          backgroundColor: settings.backgroundColor,
          borderColor: settings.borderColor
        }}
      >
        <div className="preview-message assistant" style={{ backgroundColor: settings.assistantColor }}>
          <p>Hello! How can I assist you today?</p>
        </div>
        <div className="preview-message user" style={{ backgroundColor: settings.userColor }}>
          <p>I need help with my account.</p>
        </div>
        <div className="preview-message assistant" style={{ backgroundColor: settings.assistantColor }}>
          <p>I'd be happy to help. What's your issue?</p>
        </div>
      </div>
    </div>
  );
};

export default ChatPreview;
