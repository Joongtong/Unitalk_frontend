import React, { useState, useEffect } from 'react';
import { getNotifications } from '../api/notifications';
import Notification from '../components/online/Notification';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await getNotifications();
      setNotifications(data);
    };
    fetchNotifications();
  }, []);

  return (
    <div className="notification-page">
      <h1>Notifications</h1>
      {notifications.map(notification => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationPage;