import React from 'react';

const Chat = ({ chat }) => {
  return (
    <div className="chat-message">
      <strong>{chat.sender}: </strong>
      <span>{chat.message}</span>
      <small>{new Date(chat.timestamp).toLocaleString()}</small>
    </div>
  );
};

export default Chat;