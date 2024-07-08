import React from 'react';

const Notification = ({ notification }) => {
  return (
    <div className={`notification ${notification.read ? 'read' : 'unread'}`}>
      <p>{notification.message}</p>
    </div>
  );
};

export default Notification;