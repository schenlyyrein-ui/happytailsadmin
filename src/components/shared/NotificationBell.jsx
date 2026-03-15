import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import './NotificationBell.css';

/**
 * @typedef {Object} NotificationItem
 * @property {string} id
 * @property {string} title
 * @property {string} message
 * @property {string} [time]
 * @property {boolean} [read]
 * @property {'pending'|'accepted'|'rejected'} [status]
 */

/**
 * @param {{ notifications: NotificationItem[], title?: string, onNotificationClick?: (notificationId: string) => void, onNotificationsChange?: (notifications: NotificationItem[]) => void }} props
 */
function NotificationBell({ notifications = [], title = 'Notifications', onNotificationClick, onNotificationsChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [localNotifications, setLocalNotifications] = useState(notifications);

  useEffect(() => {
    setLocalNotifications(notifications);
  }, [notifications]);

  const unreadCount = useMemo(
    () => localNotifications.filter((notification) => !notification.read && notification.status !== 'accepted' && notification.status !== 'rejected').length,
    [localNotifications]
  );

  const updateNotifications = (updater) => {
    setLocalNotifications((prev) => {
      const updated = updater(prev);
      if (onNotificationsChange) onNotificationsChange(updated);
      return updated;
    });
  };

  const handleNotificationClick = (notificationId) => {
    updateNotifications((prev) => prev.map((item) => (
      item.id === notificationId ? { ...item, read: true } : item
    )));

    if (onNotificationClick) onNotificationClick(notificationId);
    setIsOpen(false);
  };

  const markAllAsRead = () => {
    updateNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  return (
    <div className="notification-bell-wrapper">
      <button
        type="button"
        className="notification-bell-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={title}
      >
        <span className="notification-bell-icon" aria-hidden="true">🔔</span>
        {unreadCount > 0 && <span className="notification-bell-count">{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="notification-dropdown" role="dialog" aria-label={title}>
          <div className="notification-dropdown-header">
            <h3>{title}</h3>
            <button type="button" className="notification-mark-all" onClick={markAllAsRead}>Mark all read</button>
          </div>
          <div className="notification-list">
            {localNotifications.length > 0 ? (
              localNotifications.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`notification-item ${item.read ? '' : 'notification-item-unread'}`}
                  onClick={() => handleNotificationClick(item.id)}
                >
                  <div className="notification-item-heading">
                    <p className="notification-item-title">{item.title}</p>
                    {item.status && <span className={`notification-status notification-status-${item.status}`}>{item.status}</span>}
                  </div>
                  <p className="notification-item-message">{item.message}</p>
                  {item.time && <span className="notification-item-time">{item.time}</span>}
                </button>
              ))
            ) : (
              <div className="notification-empty">No pending notifications.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

NotificationBell.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    time: PropTypes.string,
    read: PropTypes.bool,
    status: PropTypes.oneOf(['pending', 'accepted', 'rejected'])
  })),
  title: PropTypes.string,
  onNotificationClick: PropTypes.func,
  onNotificationsChange: PropTypes.func
};

export default NotificationBell;
