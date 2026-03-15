// components/Dashboard.jsx
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import './Dashboard.css';
import NotificationBell from './shared/NotificationBell';

const REJECTION_REASONS = [
  'Payment not received',
  'Location out of reach',
  'Incomplete booking details',
  'Service unavailable',
  'Item unavailable',
  'Invalid request',
  'Duplicate request',
  'Outside service hours',
  'Other'
];

function Dashboard({ userType, onNotificationCountChange }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showReschedulePicker, setShowReschedulePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [actionMessage, setActionMessage] = useState({ show: false, type: '', text: '' });
  const [requestItems, setRequestItems] = useState([
    {
      id: 'dash-notif-1',
      title: 'Pending Booking Request',
      message: 'Boarding request from Kristiana Tiu',
      type: 'booking',
      requester: 'Kristiana Tiu',
      requestStatus: 'pending',
      details: 'Boarding, Mar 10, 6:00 PM',
      meta: {
        requestId: 'BID #0033',
        service: 'Boarding',
        date: 'Mar 10, 2026',
        time: '6:00 PM',
        paymentMethod: 'Cash',
        paymentStatus: 'Pending',
        total: '₱1,299.00',
        owner: 'Kristiana Tiu',
        phone: '0916-998-1234',
        email: 'kristiana@email.com',
        petName: 'Luna',
        petType: 'Dog',
        breed: 'Labrador',
        size: 'Large',
        description: 'Overnight boarding with evening and morning feeding.'
      },
      read: false,
      rejectionReason: ''
    },
    {
      id: 'dash-notif-2',
      title: 'Birthday Party Approval',
      message: 'Birthday package request from Kerizo Rafael',
      type: 'birthday',
      requester: 'Kerizo Rafael',
      requestStatus: 'pending',
      details: 'Birthday Party Gold Package, down payment required',
      meta: {
        requestId: 'BID #0036',
        service: 'Birthday Party Gold Package',
        date: 'Mar 12, 2026',
        time: '3:00 PM',
        paymentMethod: 'GCash',
        paymentStatus: 'Pending',
        total: '₱2,000.00',
        owner: 'Kerizo Rafael',
        phone: '0918-111-2233',
        email: 'kerizo@email.com',
        petName: 'Milo',
        petType: 'Dog',
        breed: 'Shih Tzu',
        size: 'Small',
        guests: '10',
        downPayment: '₱1,000.00',
        proofOfPayment: 'Uploaded screenshot placeholder'
      },
      read: false,
      rejectionReason: ''
    },
    {
      id: 'dash-notif-3',
      title: 'Pending Order Request',
      message: 'Pet shop order request from John Doe',
      type: 'order',
      requester: 'John Doe',
      requestStatus: 'pending',
      details: 'Order ORD001, Cash payment, delivery requested',
      meta: {
        requestId: 'ORD001',
        service: 'Pet Shop Order',
        date: 'Mar 10, 2026',
        time: 'ASAP',
        paymentMethod: 'GCash',
        paymentStatus: 'Pending',
        total: '₱1,250.00',
        phone: '0912-345-6789',
        email: 'john.doe@email.com',
        address: '123 Main St, Manila, Philippines',
        items: ['JerHigh Dog Treats 70g x2', 'Pet Toy Braided Rope 17cm x1'],
        proofOfPayment: 'Uploaded screenshot placeholder'
      },
      read: false,
      rejectionReason: ''
    }
  ]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestRejection, setRequestRejection] = useState({ reason: 'Payment not received', otherReason: '' });
  const [showRejectFlow, setShowRejectFlow] = useState(false);

  const stats = {
    totalCustomers: 245,
    customerGrowth: 12,
    todayBookings: 12,
    pendingOrders: 7
  };

  const notifications = useMemo(
    () => requestItems.map((request) => ({
      id: request.id,
      title: request.title,
      message: request.message,
      time: 'New',
      read: request.read,
      status: request.requestStatus
    })),
    [requestItems]
  );

  useEffect(() => {
    if (onNotificationCountChange) {
      onNotificationCountChange(requestItems.filter((item) => item.requestStatus === 'pending').length);
    }
  }, [requestItems, onNotificationCountChange]);

  const scheduleData = {
    'sch-001': {
      id: 'sch-001',
      type: 'grooming',
      petName: 'Max',
      petType: 'Dog',
      breed: 'Golden Retriever',
      service: 'Dog Grooming Deluxe',
      owner: 'Karl Siquian',
      contact: '0917-555-1234',
      email: 'karl.s@email.com',
      time: '2:00 PM - 3:00 PM',
      date: 'Today, February 23, 2026',
      status: 'Confirmed',
      price: '₱499.00',
      includes: ['Bath', 'Haircut', 'Nail trimming', 'Ear cleaning']
    },
    'sch-002': {
      id: 'sch-002',
      type: 'grooming',
      petName: 'Pixie',
      petType: 'Cat',
      breed: 'Persian',
      service: 'Cat Grooming',
      owner: 'Maria Santos',
      contact: '0918-555-5678',
      email: 'maria.s@email.com',
      time: '3:00 PM - 4:00 PM',
      date: 'Today, February 23, 2026',
      status: 'Confirmed',
      price: '₱399.00',
      includes: ['Bath', 'Fur brushing', 'Nail trimming']
    },
    'sch-003': {
      id: 'sch-003',
      type: 'hotel',
      petName: 'Luna',
      petType: 'Dog',
      breed: 'Husky',
      service: 'Overnight Stay',
      owner: 'John Reyes',
      contact: '0919-555-9012',
      email: 'john.r@email.com',
      time: '6:00 PM - 9:00 AM',
      date: 'February 23-24, 2026',
      status: 'Checked-in',
      price: '₱1,200.00',
      includes: ['Overnight accommodation', 'Evening walk', 'Breakfast', 'Playtime']
    },
    'sch-004': {
      id: 'sch-004',
      type: 'hotel',
      petName: 'Draco',
      petType: 'Dog',
      breed: 'Shih Tzu',
      service: 'Daycare',
      owner: 'Anna Lim',
      contact: '0920-555-3456',
      email: 'anna.l@email.com',
      time: '8:00 AM - 5:00 PM',
      date: 'Today, February 23, 2026',
      status: 'In progress',
      price: '₱450.00',
      includes: ['Supervision', 'Meals', 'Play sessions', 'Naptime']
    }
  };

  const timeSlots = [
    '8:00 AM - 9:00 AM', '9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM', '1:00 PM - 2:00 PM', '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM', '4:00 PM - 5:00 PM'
  ];

  const handleViewDetails = (id) => {
    setSelectedItem(scheduleData[id]);
    setShowPopup(true);
    setShowCancelConfirm(false);
    setShowReschedulePicker(false);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedItem(null);
    setShowCancelConfirm(false);
    setShowReschedulePicker(false);
    setSelectedDate('');
    setSelectedTime('');
  };

  const handleMarkAsCompleted = () => {
    setActionMessage({
      show: true,
      type: 'success',
      text: `${selectedItem.petName}'s ${selectedItem.type} has been marked as completed!`
    });
    
    setTimeout(() => {
      setActionMessage({ show: false, type: '', text: '' });
      closePopup();
    }, 2000);
  };

  const handleReschedule = () => {
    setShowReschedulePicker(true);
  };

  const confirmReschedule = () => {
    if (!selectedDate || !selectedTime) {
      setActionMessage({
        show: true,
        type: 'error',
        text: 'Please select both date and time'
      });
      setTimeout(() => {
        setActionMessage({ show: false, type: '', text: '' });
      }, 2000);
      return;
    }

    setActionMessage({
      show: true,
      type: 'success',
      text: `${selectedItem.petName}'s booking rescheduled to ${selectedDate} at ${selectedTime}`
    });
    
    setTimeout(() => {
      setActionMessage({ show: false, type: '', text: '' });
      setShowReschedulePicker(false);
      closePopup();
    }, 2000);
  };

  const handleCancel = () => {
    setShowCancelConfirm(true);
  };

  const confirmCancel = () => {
    setShowCancelConfirm(false);
    
    setActionMessage({
      show: true,
      type: 'warning',
      text: `${selectedItem.petName}'s ${selectedItem.type} has been cancelled successfully!`
    });
    
    setTimeout(() => {
      setActionMessage({ show: false, type: '', text: '' });
      closePopup();
    }, 2000);
  };

  const handleNotificationClick = (notificationId) => {
    const request = requestItems.find((item) => item.id === notificationId);
    if (!request) return;
    setSelectedRequest(request);
    setShowRequestModal(true);
    setShowRejectFlow(false);
    setRequestRejection({ reason: 'Payment not received', otherReason: '' });
    setRequestItems((prev) => prev.map((item) => (item.id === notificationId ? { ...item, read: true } : item)));
  };

  const handleNotificationStateChange = (updatedNotifications) => {
    setRequestItems((prev) => prev.map((item) => {
      const match = updatedNotifications.find((notification) => notification.id === item.id);
      return match ? { ...item, read: Boolean(match.read) } : item;
    }));
  };

  const handleAcceptRequest = () => {
    if (!selectedRequest) return;
    setRequestItems((prev) => prev.map((item) => (
      item.id === selectedRequest.id ? { ...item, requestStatus: 'accepted', read: true, rejectionReason: '' } : item
    )));
    setSelectedRequest((prev) => (prev ? { ...prev, requestStatus: 'accepted', rejectionReason: '' } : prev));
  };

  const handleRejectRequest = () => {
    if (!selectedRequest) return;
    const reason = requestRejection.reason === 'Other' ? requestRejection.otherReason.trim() : requestRejection.reason;
    if (!reason) return;
    setRequestItems((prev) => prev.map((item) => (
      item.id === selectedRequest.id ? { ...item, requestStatus: 'rejected', rejectionReason: reason, read: true } : item
    )));
    setSelectedRequest((prev) => (prev ? { ...prev, requestStatus: 'rejected', rejectionReason: reason } : prev));
    setShowRejectFlow(false);
  };

  return (
    <div className="dashboard-container">
      {actionMessage.show && (
        <div className={`dashboard-toast dashboard-toast-${actionMessage.type}`}>
          {actionMessage.text}
        </div>
      )}

      
<div className="dashboard-header">
  <div className="dashboard-header-left">
    <h1 className="dashboard-title">Welcome back, {userType === 'owner' ? 'Owner' : 'Staff'}!</h1>
    <p className="dashboard-subtitle">Here's what's happening at Happy Tails today.</p>
  </div>
  <div className="dashboard-header-actions">
    <NotificationBell
      notifications={notifications}
      title="Action Required"
      onNotificationClick={handleNotificationClick}
      onNotificationsChange={handleNotificationStateChange}
    />
    <div className="dashboard-profile">
      <div className="dashboard-profile-info">
        <span className="dashboard-profile-name">Colbis Aya</span>
        <span className="dashboard-profile-role">Admin</span>
      </div>
      <div className="dashboard-profile-avatar">CA</div>
    </div>
  </div>
</div>

      <div className="dashboard-stats-grid">
        <div className="dashboard-stat-card">
          <h3 className="dashboard-stat-label">Total Customers</h3>
          <div className="dashboard-stat-value">{stats.totalCustomers}</div>
          <div className="dashboard-stat-growth dashboard-growth-positive">↑ {stats.customerGrowth}%</div>
        </div>
        <div className="dashboard-stat-card">
          <h3 className="dashboard-stat-label">Today's Bookings</h3>
          <div className="dashboard-stat-value">{stats.todayBookings}</div>
        </div>
        <div className="dashboard-stat-card">
          <h3 className="dashboard-stat-label">Pending Orders</h3>
          <div className="dashboard-stat-value">{stats.pendingOrders}</div>
        </div>
      </div>

      <div className="dashboard-three-column">
        <div className="dashboard-column">
          <div className="dashboard-card">
            <h2 className="dashboard-card-title">Today's Schedule</h2>
            <div className="dashboard-schedule-list">
              <div className="dashboard-schedule-item">
                <span className="dashboard-schedule-badge dashboard-badge-grooming">Grooming</span>
                <div className="dashboard-schedule-content">
                  <span className="dashboard-pet-name">Pet: Max - Dog Grooming Deluxe</span>
                  <div className="dashboard-schedule-actions">
                    <span className="dashboard-schedule-time">{scheduleData['sch-001'].time}</span>
                    <button 
                      onClick={() => handleViewDetails('sch-001')}
                      className="dashboard-view-btn dashboard-view-schedule"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="dashboard-schedule-item">
                <span className="dashboard-schedule-badge dashboard-badge-grooming">Grooming</span>
                <div className="dashboard-schedule-content">
                  <span className="dashboard-pet-name">Pet: Pixie - Cat Grooming</span>
                  <div className="dashboard-schedule-actions">
                    <span className="dashboard-schedule-time">{scheduleData['sch-002'].time}</span>
                    <button 
                      onClick={() => handleViewDetails('sch-002')}
                      className="dashboard-view-btn dashboard-view-schedule"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="dashboard-schedule-item">
                <span className="dashboard-schedule-badge dashboard-badge-hotel">Pet Hotel</span>
                <div className="dashboard-schedule-content">
                  <span className="dashboard-pet-name">Pet: Luna - Overnight</span>
                  <div className="dashboard-schedule-actions">
                    <span className="dashboard-schedule-time">{scheduleData['sch-003'].time}</span>
                    <button 
                      onClick={() => handleViewDetails('sch-003')}
                      className="dashboard-view-btn dashboard-view-hotel"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="dashboard-schedule-item">
                <span className="dashboard-schedule-badge dashboard-badge-hotel">Pet Hotel</span>
                <div className="dashboard-schedule-content">
                  <span className="dashboard-pet-name">Pet: Draco - Daycare</span>
                  <div className="dashboard-schedule-actions">
                    <span className="dashboard-schedule-time">{scheduleData['sch-004'].time}</span>
                    <button 
                      onClick={() => handleViewDetails('sch-004')}
                      className="dashboard-view-btn dashboard-view-hotel"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-column">
          <div className="dashboard-card">
            <h2 className="dashboard-card-title">Alerts & Notifications</h2>
            <div className="dashboard-alerts-list">
              <div className="dashboard-alert-item">
                <span className="dashboard-alert-icon">⚠️</span>
                <div className="dashboard-alert-content">
                  <strong className="dashboard-alert-title">Low Stock Alert</strong>
                  <p className="dashboard-alert-message">Premium Dog Food running low (5 units left)</p>
                  <span className="dashboard-alert-time">2hrs ago</span>
                </div>
              </div>
              
              <div className="dashboard-alert-item">
                <span className="dashboard-alert-icon">🎂</span>
                <div className="dashboard-alert-content">
                  <strong className="dashboard-alert-title">Upcoming Birthday Party</strong>
                  <p className="dashboard-alert-message">Max's birthday party scheduled for tomorrow</p>
                  <span className="dashboard-alert-time">2hrs ago</span>
                </div>
              </div>
              
              <div className="dashboard-alert-item">
                <span className="dashboard-alert-icon">⚠️</span>
                <div className="dashboard-alert-content">
                  <strong className="dashboard-alert-title">Low Stock Alert</strong>
                  <p className="dashboard-alert-message">Premium Dog Food running low (5 units left)</p>
                  <span className="dashboard-alert-time">2hrs ago</span>
                </div>
              </div>
              
              <div className="dashboard-alert-item">
                <span className="dashboard-alert-icon">⚠️</span>
                <div className="dashboard-alert-content">
                  <strong className="dashboard-alert-title">Low Stock Alert</strong>
                  <p className="dashboard-alert-message">Premium dog food running low (5 units left)</p>
                  <span className="dashboard-alert-time">2hrs ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-column">
          <div className="dashboard-card">
            <h2 className="dashboard-card-title">Recent Activity</h2>
            <div className="dashboard-activity-list">
              <div className="dashboard-activity-item">
                <span className="dashboard-activity-icon">✅</span>
                <div className="dashboard-activity-content">
                  <strong className="dashboard-activity-title">Order Completed</strong>
                  <p className="dashboard-activity-message">Order #0037 has been picked up</p>
                  <span className="dashboard-activity-time">2hrs ago</span>
                </div>
              </div>
              
              <div className="dashboard-activity-item">
                <span className="dashboard-activity-icon">⭐</span>
                <div className="dashboard-activity-content">
                  <strong className="dashboard-activity-title">Customer Feedback</strong>
                  <p className="dashboard-activity-message">New 5-star review from Chenly Lee!</p>
                  <span className="dashboard-activity-time">2hrs ago</span>
                </div>
              </div>
              
              <div className="dashboard-activity-item">
                <span className="dashboard-activity-icon">✅</span>
                <div className="dashboard-activity-content">
                  <strong className="dashboard-activity-title">Order Completed</strong>
                  <p className="dashboard-activity-message">Order #0035 has been picked up</p>
                  <span className="dashboard-activity-time">2hrs ago</span>
                </div>
              </div>
              
              <div className="dashboard-activity-item">
                <span className="dashboard-activity-icon">⭐</span>
                <div className="dashboard-activity-content">
                  <strong className="dashboard-activity-title">Customer Feedback</strong>
                  <p className="dashboard-activity-message">New 5-star review from Karl Bautista!</p>
                  <span className="dashboard-activity-time">2hrs ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showRequestModal && selectedRequest && (
        <div className="dashboard-popup-overlay" onClick={() => setShowRequestModal(false)}>
          <div className="dashboard-request-modal" onClick={(event) => event.stopPropagation()}>
            <div className="dashboard-request-header">
              <h3>{selectedRequest.title}</h3>
              <button className="dashboard-popup-close" onClick={() => setShowRequestModal(false)}>×</button>
            </div>
            <div className="dashboard-request-body">
              <div className="dashboard-request-grid dashboard-request-grid--cards">
                <div className="dashboard-request-card">
                  <h4>Request Overview</h4>
                  <div><strong>Requester:</strong> {selectedRequest.requester}</div>
                  <div><strong>Type:</strong> {selectedRequest.type}</div>
                  <div><strong>Status:</strong> {selectedRequest.requestStatus}</div>
                  <div><strong>Summary:</strong> {selectedRequest.details}</div>
                  <div><strong>Request ID:</strong> {selectedRequest.meta?.requestId}</div>
                </div>

                {selectedRequest.type === 'order' ? (
                  <>
                    <div className="dashboard-request-card">
                      <h4>Order Details</h4>
                      <div><strong>Category:</strong> {selectedRequest.meta?.service}</div>
                      <div><strong>Date:</strong> {selectedRequest.meta?.date}</div>
                      <div><strong>ETA:</strong> {selectedRequest.meta?.time}</div>
                      <div><strong>Phone:</strong> {selectedRequest.meta?.phone}</div>
                      <div><strong>Email:</strong> {selectedRequest.meta?.email}</div>
                      <div><strong>Address:</strong> {selectedRequest.meta?.address}</div>
                      <div><strong>Total:</strong> {selectedRequest.meta?.total}</div>
                    </div>
                    <div className="dashboard-request-card">
                      <h4>Order Items</h4>
                      <ul className="dashboard-request-list">
                        {(selectedRequest.meta?.items || []).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="dashboard-request-card">
                      <h4>Booking Details</h4>
                      <div><strong>Service:</strong> {selectedRequest.meta?.service}</div>
                      <div><strong>Date:</strong> {selectedRequest.meta?.date}</div>
                      <div><strong>Time:</strong> {selectedRequest.meta?.time}</div>
                      <div><strong>Owner:</strong> {selectedRequest.meta?.owner}</div>
                      <div><strong>Phone:</strong> {selectedRequest.meta?.phone}</div>
                      <div><strong>Email:</strong> {selectedRequest.meta?.email}</div>
                      <div><strong>Total:</strong> {selectedRequest.meta?.total}</div>
                    </div>
                    <div className="dashboard-request-card">
                      <h4>Pet Information</h4>
                      <div><strong>Name:</strong> {selectedRequest.meta?.petName}</div>
                      <div><strong>Type:</strong> {selectedRequest.meta?.petType}</div>
                      <div><strong>Breed:</strong> {selectedRequest.meta?.breed}</div>
                      <div><strong>Size:</strong> {selectedRequest.meta?.size}</div>
                      {selectedRequest.meta?.guests && <div><strong>Guests:</strong> {selectedRequest.meta.guests}</div>}
                      {selectedRequest.meta?.downPayment && <div><strong>Down Payment:</strong> {selectedRequest.meta.downPayment}</div>}
                      {selectedRequest.meta?.description && <div><strong>Notes:</strong> {selectedRequest.meta.description}</div>}
                    </div>
                  </>
                )}

                <div className="dashboard-request-card">
                  <h4>Payment Details</h4>
                  <div><strong>Payment Method:</strong> {selectedRequest.meta?.paymentMethod}</div>
                  <div><strong>Payment Status:</strong> {selectedRequest.meta?.paymentStatus}</div>
                  <div><strong>Total:</strong> {selectedRequest.meta?.total}</div>
                  {selectedRequest.meta?.paymentMethod === 'GCash' && (
                    <div className="dashboard-proof-card">
                      <strong>GCash Proof of Payment</strong>
                      <div className="dashboard-proof-placeholder">
                        <span className="dashboard-proof-icon">IMG</span>
                        <p>{selectedRequest.meta?.proofOfPayment || 'Awaiting uploaded proof of payment screenshot.'}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {selectedRequest.requestStatus === 'rejected' && selectedRequest.rejectionReason && (
              <p className="dashboard-request-reason"><strong>Rejection Reason:</strong> {selectedRequest.rejectionReason}</p>
            )}

            {selectedRequest.requestStatus === 'pending' && (
              <>
                {showRejectFlow ? (
                  <div className="dashboard-reject-box">
                    <label htmlFor="dashboard-reason-select">Rejection Reason</label>
                    <select
                      id="dashboard-reason-select"
                      className="dashboard-form-select"
                      value={requestRejection.reason}
                      onChange={(event) => setRequestRejection((prev) => ({ ...prev, reason: event.target.value }))}
                    >
                      {REJECTION_REASONS.map((reason) => <option key={reason}>{reason}</option>)}
                    </select>
                    {requestRejection.reason === 'Other' && (
                      <textarea
                        className="dashboard-form-input"
                        value={requestRejection.otherReason}
                        placeholder="Enter custom reason"
                        onChange={(event) => setRequestRejection((prev) => ({ ...prev, otherReason: event.target.value }))}
                      />
                    )}
                  </div>
                ) : null}

                <div className="dashboard-request-actions">
                  {!showRejectFlow && (
                    <button className="dashboard-popup-btn dashboard-popup-btn-pink" onClick={handleAcceptRequest}>
                      Accept Request
                    </button>
                  )}
                  {!showRejectFlow && (
                    <button className="dashboard-popup-btn dashboard-popup-btn-pink" onClick={() => setShowRejectFlow(true)}>
                      Reject Request
                    </button>
                  )}
                  {showRejectFlow && (
                    <>
                      <button className="dashboard-popup-btn dashboard-popup-btn-pink" onClick={handleRejectRequest}>
                        Confirm Reject
                      </button>
                      <button className="dashboard-popup-btn dashboard-popup-btn-pink" onClick={() => setShowRejectFlow(false)}>
                        Back
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Popup Modals */}
      {showPopup && selectedItem && !showCancelConfirm && !showReschedulePicker && (
        <div className="dashboard-popup-overlay" onClick={closePopup}>
          <div className="dashboard-popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="dashboard-popup-close" onClick={closePopup}>×</button>
            
            <div className="dashboard-popup-header">
              <h3 className="dashboard-popup-title">
                {selectedItem.type === 'grooming' ? 'Grooming Details' : 'Pet Hotel Details'}
              </h3>
              <span className={`dashboard-popup-status dashboard-status-${selectedItem.status.toLowerCase().replace(' ', '-')}`}>
                {selectedItem.status}
              </span>
            </div>

            <div className="dashboard-popup-body">
              <div className="dashboard-popup-section">
                <h4>Pet Information</h4>
                <div className="dashboard-popup-info-grid">
                  <div className="dashboard-popup-info-item">
                    <span className="dashboard-popup-info-label">Pet Name:</span>
                    <span className="dashboard-popup-info-value">{selectedItem.petName}</span>
                  </div>
                  <div className="dashboard-popup-info-item">
                    <span className="dashboard-popup-info-label">Type:</span>
                    <span className="dashboard-popup-info-value">{selectedItem.petType}</span>
                  </div>
                  <div className="dashboard-popup-info-item">
                    <span className="dashboard-popup-info-label">Breed:</span>
                    <span className="dashboard-popup-info-value">{selectedItem.breed}</span>
                  </div>
                </div>
              </div>

              <div className="dashboard-popup-section">
                <h4>Service Details</h4>
                <div className="dashboard-popup-info-grid">
                  <div className="dashboard-popup-info-item">
                    <span className="dashboard-popup-info-label">Service:</span>
                    <span className="dashboard-popup-info-value">{selectedItem.service}</span>
                  </div>
                  <div className="dashboard-popup-info-item">
                    <span className="dashboard-popup-info-label">Date:</span>
                    <span className="dashboard-popup-info-value">{selectedItem.date}</span>
                  </div>
                  <div className="dashboard-popup-info-item">
                    <span className="dashboard-popup-info-label">Time:</span>
                    <span className="dashboard-popup-info-value">{selectedItem.time}</span>
                  </div>
                </div>
              </div>

              <div className="dashboard-popup-section">
                <h4>Owner Information</h4>
                <div className="dashboard-popup-info-grid">
                  <div className="dashboard-popup-info-item">
                    <span className="dashboard-popup-info-label">Name:</span>
                    <span className="dashboard-popup-info-value">{selectedItem.owner}</span>
                  </div>
                  <div className="dashboard-popup-info-item">
                    <span className="dashboard-popup-info-label">Contact:</span>
                    <span className="dashboard-popup-info-value">{selectedItem.contact}</span>
                  </div>
                  <div className="dashboard-popup-info-item">
                    <span className="dashboard-popup-info-label">Email:</span>
                    <span className="dashboard-popup-info-value">{selectedItem.email}</span>
                  </div>
                </div>
              </div>

              <div className="dashboard-popup-section">
                <h4>Inclusions</h4>
                <ul className="dashboard-popup-inclusions-list">
                  {selectedItem.includes.map((item, index) => (
                    <li key={index} className="dashboard-popup-inclusion-item">{item}</li>
                  ))}
                </ul>
              </div>

              <div className="dashboard-popup-total">
                <span className="dashboard-popup-total-label">Total Amount:</span>
                <span className="dashboard-popup-total-value">{selectedItem.price}</span>
              </div>
            </div>

            <div className="dashboard-popup-footer">
              <button className="dashboard-popup-btn dashboard-popup-btn-pink" onClick={handleMarkAsCompleted}>
                Mark Completed
              </button>
              <button className="dashboard-popup-btn dashboard-popup-btn-pink" onClick={handleReschedule}>
                Reschedule
              </button>
              <button className="dashboard-popup-btn dashboard-popup-btn-pink" onClick={handleCancel}>
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {showReschedulePicker && selectedItem && (
        <div className="dashboard-popup-overlay" onClick={closePopup}>
          <div className="dashboard-popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="dashboard-popup-close" onClick={closePopup}>×</button>
            
            <div className="dashboard-popup-header">
              <h3 className="dashboard-popup-title">Reschedule Booking</h3>
            </div>

            <div className="dashboard-popup-body">
              <p className="dashboard-reschedule-info">
                Rescheduling for: <strong>{selectedItem.petName} - {selectedItem.service}</strong>
              </p>

              <div className="dashboard-form-group">
                <label className="dashboard-form-label">Select New Date</label>
                <input 
                  type="date"
                  className="dashboard-form-input"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="dashboard-form-group">
                <label className="dashboard-form-label">Select New Time</label>
                <select 
                  className="dashboard-form-select"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option value="">Choose time slot</option>
                  {timeSlots.map((slot, index) => (
                    <option key={index} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              <div className="dashboard-reschedule-actions">
                <button className="dashboard-reschedule-btn dashboard-reschedule-cancel" onClick={() => setShowReschedulePicker(false)}>
                  Back
                </button>
                <button className="dashboard-reschedule-btn dashboard-reschedule-pink" onClick={confirmReschedule}>
                  Confirm Reschedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCancelConfirm && selectedItem && (
        <div className="dashboard-popup-overlay" onClick={closePopup}>
          <div className="dashboard-popup-content dashboard-confirm-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="dashboard-confirm-title">Cancel Booking</h3>
            <p className="dashboard-confirm-message">
              Are you sure you want to cancel {selectedItem.petName}'s {selectedItem.type} booking?
            </p>
            <p className="dashboard-confirm-warning">This action cannot be undone.</p>
            
            <div className="dashboard-confirm-buttons">
              <button className="dashboard-confirm-btn dashboard-confirm-no" onClick={() => setShowCancelConfirm(false)}>
                No, Keep Booking
              </button>
              <button className="dashboard-confirm-btn dashboard-confirm-pink" onClick={confirmCancel}>
                Yes, Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

Dashboard.propTypes = {
  userType: PropTypes.string,
  onNotificationCountChange: PropTypes.func
};
