import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import './Orders.css';
import NotificationBell from './shared/NotificationBell';
import EditTotalModal from './shared/EditTotalModal';
import { getRiders } from '../data/riders';

const CATEGORY_TABS = ['All', 'Pet Shop', 'Pet Menu'];
const STATUS_OPTIONS = ['Pending', 'Order Placed', 'Preparing Order', 'Rider Picked Up', 'Out for Delivery', 'Delivered', 'Cancelled'];
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

const defaultTimeline = [
  { key: 'placed', title: 'Order Placed', description: 'Order request has been placed by customer.', timestamp: '', completed: false },
  { key: 'preparing', title: 'Preparing Order', description: 'Order is being prepared and packed.', timestamp: '', completed: false },
  { key: 'picked_up', title: 'Rider Picked Up', description: 'Assigned rider picked up the package.', timestamp: '', completed: false },
  { key: 'out_for_delivery', title: 'Out for Delivery', description: 'Rider is on the way to customer address.', timestamp: '', completed: false },
  { key: 'delivered', title: 'Delivered', description: 'Order delivered successfully to customer.', timestamp: '', completed: false }
];

/**
 * @param {TimelineStep[]} timeline
 */
const getStatusFromTimeline = (timeline) => {
  const latestCompletedStep = [...timeline].reverse().find((step) => step.completed);
  return latestCompletedStep ? latestCompletedStep.title : 'Pending';
};
/**
 * @typedef {{ name: string, contact: string, vehicle: string, plateNumber: string }} Rider
 * @typedef {{ name: string, quantity: number, price: number, total: number }} OrderItem
 * @typedef {{ key: string, title: string, description: string, timestamp: string, completed: boolean }} TimelineStep
 * @typedef {{ id: string, category: string, customer: string, email: string, phone: string, date: string, items: OrderItem[], baseTotal: number, total: number, status: string, requestStatus: 'Pending Request'|'Accepted'|'Rejected', rejectionReason?: string, paymentMethod: string, paymentStatus: string, shippingAddress: string, eta: string, rider: Rider | null, timeline: TimelineStep[], proofOfPayment?: string }} Order
 */

/**
 * @param {{ onNotificationCountChange?: (count: number) => void }} props
 */
function Orders({ onNotificationCountChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(/** @type {Order|null} */(null));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState('details');
  const [riders, setRiders] = useState(/** @type {Rider[]} */([]));
  const [totalEditModal, setTotalEditModal] = useState({ open: false, orderId: '', value: '' });
  const [rejectionModal, setRejectionModal] = useState({ open: false, reason: 'Payment not received', otherReason: '' });

  const [orders, setOrders] = useState(/** @type {Order[]} */([
    {
      id: 'ORD001',
      category: 'Pet Shop',
      customer: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+63 912 345 6789',
      date: '2026-03-09',
      items: [
        { name: 'JerHigh Dog Treats 70g', quantity: 2, price: 119, total: 238 },
        { name: 'Pet Toy Braided Rope 17cm', quantity: 1, price: 25, total: 25 }
      ],
      baseTotal: 1250,
      total: 1250,
      status: 'Pending',
      requestStatus: 'Pending Request',
      paymentMethod: 'GCash',
      paymentStatus: 'Pending',
      shippingAddress: '123 Main St, Manila, Philippines',
      eta: '40 mins',
      rider: null,
      proofOfPayment: 'Uploaded screenshot placeholder',
      timeline: defaultTimeline
    },
    {
      id: 'ORD002',
      category: 'Pet Menu',
      customer: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+63 923 456 7890',
      date: '2026-03-09',
      items: [
        { name: 'Chicken Bowl Meal', quantity: 2, price: 180, total: 360 },
        { name: 'Pet-safe Latte', quantity: 1, price: 125, total: 125 }
      ],
      baseTotal: 850,
      total: 850,
      status: 'Preparing Order',
      requestStatus: 'Accepted',
      paymentMethod: 'GCash',
      paymentStatus: 'Paid',
      shippingAddress: '456 Oak Ave, Quezon City, Philippines',
      eta: '25 mins',
      rider: null,
      timeline: defaultTimeline.map((step, index) => {
        if (index === 0) return { ...step, completed: true, timestamp: '2026-03-09 10:05' };
        if (index === 1) return { ...step, completed: true, timestamp: '2026-03-09 10:15' };
        return { ...step };
      })
    }
  ]));

  useEffect(() => {
    setRiders(getRiders());
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      setRiders(getRiders());
    }
  }, [isModalOpen]);

  const notifications = useMemo(
    () => orders
      .map((order) => ({
        id: order.id,
        title: 'Pending Order Request',
        message: `${order.id} - ${order.customer} (${order.category})`,
        time: 'New',
        read: order.requestStatus !== 'Pending Request',
        status: order.requestStatus === 'Pending Request' ? 'pending' : order.requestStatus.toLowerCase()
      })),
    [orders]
  );

  useEffect(() => {
    if (onNotificationCountChange) {
      onNotificationCountChange(orders.filter((order) => order.requestStatus === 'Pending Request').length);
    }
  }, [orders, onNotificationCountChange]);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
      || order.customer.toLowerCase().includes(searchTerm.toLowerCase())
      || order.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All Status' || order.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || order.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = [
    { label: 'Total Orders', value: orders.length.toString().padStart(2, '0') },
    { label: 'Pending Requests', value: orders.filter((order) => order.requestStatus === 'Pending Request').length.toString().padStart(2, '0') },
    { label: 'Out for Delivery', value: orders.filter((order) => order.status === 'Out for Delivery').length.toString().padStart(2, '0') },
    { label: 'Delivered', value: orders.filter((order) => order.status === 'Delivered').length.toString().padStart(2, '0') }
  ];

  const formatCurrency = (amount) => `₱${amount.toFixed(2)}`;
  const getStatusClass = (status) => `order-status-badge status-${status.toLowerCase().replace(/\s+/g, '-')}`;

  const handleViewDetails = (order) => {
    setSelectedOrder({ ...order });
    setActiveModalTab('details');
    setIsModalOpen(true);
  };

  const handleNotificationClick = (notificationId) => {
    const relatedOrder = orders.find((order) => order.id === notificationId);
    if (!relatedOrder) return;
    handleViewDetails(relatedOrder);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const updateOrderInState = (updatedOrder) => {
    setOrders((prev) => prev.map((order) => (order.id === updatedOrder.id ? updatedOrder : order)));
    setSelectedOrder(updatedOrder);
  };

  const handleAssignRider = (riderName) => {
    if (!selectedOrder) return;
    const rider = riders.find((item) => item.name === riderName) || null;
    updateOrderInState({ ...selectedOrder, rider });
  };

  const handleUpdateEta = (eta) => {
    if (!selectedOrder) return;
    updateOrderInState({ ...selectedOrder, eta });
  };

  const handleTimelineUpdate = (index, key, value) => {
    if (!selectedOrder) return;
    const timeline = selectedOrder.timeline.map((step, stepIndex) => (stepIndex === index ? { ...step, [key]: value } : step));
    updateOrderInState({ ...selectedOrder, timeline });
  };

  const handleSetTimelineProgress = (targetIndex) => {
    if (!selectedOrder) return;

    const timeline = selectedOrder.timeline.map((step, index) => ({
      ...step,
      completed: index <= targetIndex,
      timestamp: index === targetIndex && !step.timestamp ? new Date().toLocaleString() : step.timestamp
    }));

    const derivedStatus = getStatusFromTimeline(timeline);
    updateOrderInState({
      ...selectedOrder,
      timeline,
      status: derivedStatus
    });
  };

  const handleAcceptOrderRequest = () => {
    if (!selectedOrder) return;
    const acceptedTimeline = selectedOrder.timeline.map((step, index) => (
      index === 0
        ? { ...step, completed: true, timestamp: step.timestamp || new Date().toLocaleString() }
        : step
    ));
    updateOrderInState({
      ...selectedOrder,
      requestStatus: 'Accepted',
      timeline: acceptedTimeline,
      status: getStatusFromTimeline(acceptedTimeline),
      rejectionReason: ''
    });
  };

  const confirmRejectOrder = () => {
    if (!selectedOrder) return;
    const finalReason = rejectionModal.reason === 'Other' ? rejectionModal.otherReason.trim() : rejectionModal.reason;
    if (!finalReason) return;

    updateOrderInState({
      ...selectedOrder,
      requestStatus: 'Rejected',
      status: 'Cancelled',
      rejectionReason: finalReason
    });
    setRejectionModal({ open: false, reason: 'Payment not received', otherReason: '' });
  };

  const handleSaveTotal = (orderId) => {
    const parsed = Number(totalEditModal.value);
    if (Number.isNaN(parsed) || parsed < 0) return;

    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, total: parsed } : order)));
    setSelectedOrder((prev) => (prev && prev.id === orderId ? { ...prev, total: parsed } : prev));
    setTotalEditModal({ open: false, orderId: '', value: '' });
  };

  return (
    <div className="orders-container">
      <div className="orders-header orders-header--with-actions">
        <div>
          <h1>Orders</h1>
          <p>Manage order requests, payment details, rider assignment, and delivery tracking.</p>
        </div>
        <NotificationBell notifications={notifications} title="Order Requests" onNotificationClick={handleNotificationClick} />
      </div>

      <div className="orders-tabs" role="tablist" aria-label="Order source category">
        {CATEGORY_TABS.map((tab) => (
          <button key={tab} type="button" className={`orders-tab ${categoryFilter === tab ? 'active' : ''}`} onClick={() => setCategoryFilter(tab)}>
            {tab}
          </button>
        ))}
      </div>

      <div className="orders-stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <h3>{stat.label}</h3>
            <div className="stat-number">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="orders-filters">
        <input type="text" className="orders-search-input" placeholder="Search orders..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
        <select className="orders-filter-select" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option>All Status</option>
          {STATUS_OPTIONS.map((status) => <option key={status}>{status}</option>)}
        </select>
      </div>

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Category</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Payment Method</th>
              <th>Payment Status</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td><strong>{order.id}</strong></td>
                  <td>{order.category}</td>
                  <td>{order.customer}</td>
                  <td>{order.date}</td>
                  <td>
                    <button
                      type="button"
                      className="orders-total-trigger"
                      onClick={() => setTotalEditModal({ open: true, orderId: order.id, value: String(order.total) })}
                    >
                      {formatCurrency(order.total)}
                    </button>
                  </td>
                  <td>
                    <select
                      className="orders-inline-select"
                      value={order.paymentMethod}
                      onChange={(event) => setOrders((prev) => prev.map((item) => (item.id === order.id ? { ...item, paymentMethod: event.target.value } : item)))}
                    >
                      <option>Cash</option>
                      <option>GCash</option>
                    </select>
                  </td>
                  <td>
                    <select
                      className="orders-inline-select"
                      value={order.paymentStatus}
                      onChange={(event) => setOrders((prev) => prev.map((item) => (item.id === order.id ? { ...item, paymentStatus: event.target.value } : item)))}
                    >
                      <option>Pending</option>
                      <option>Paid</option>
                      <option>Failed</option>
                      <option>Refunded</option>
                    </select>
                  </td>
                  <td><span className={getStatusClass(order.status)}>{order.status}</span></td>
                  <td><button className="view-details-btn" onClick={() => handleViewDetails(order)}>View Details</button></td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="9" className="orders-empty-row">No orders found matching your criteria.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedOrder && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content orders-modal-content" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Details - {selectedOrder.id}</h2>
              <button className="close-btn" onClick={handleCloseModal}>×</button>
            </div>

            <div className="orders-modal-tabs">
              <button type="button" className={`orders-modal-tab ${activeModalTab === 'details' ? 'active' : ''}`} onClick={() => setActiveModalTab('details')}>Details</button>
              <button type="button" className={`orders-modal-tab ${activeModalTab === 'tracking' ? 'active' : ''}`} onClick={() => setActiveModalTab('tracking')}>Track Order</button>
            </div>

            <div className="modal-body orders-modal-scroll-body">
              {activeModalTab === 'details' && (
                <div className="orders-details-layout">
                  <div>
                    <div className="order-details-grid">
                      <div className="detail-item"><span className="detail-label">Customer</span><span className="detail-value">{selectedOrder.customer}</span></div>
                      <div className="detail-item"><span className="detail-label">Email</span><span className="detail-value">{selectedOrder.email}</span></div>
                      <div className="detail-item"><span className="detail-label">Phone</span><span className="detail-value">{selectedOrder.phone}</span></div>
                      <div className="detail-item"><span className="detail-label">Order Date</span><span className="detail-value">{selectedOrder.date}</span></div>
                      <div className="detail-item"><span className="detail-label">Category</span><span className="detail-value">{selectedOrder.category}</span></div>
                      <div className="detail-item">
                        <span className="detail-label">Status</span>
                        <span className={getStatusClass(selectedOrder.status)}>{selectedOrder.status}</span>
                      </div>
                      <div className="detail-item"><span className="detail-label">Payment Method</span><span className="detail-value">{selectedOrder.paymentMethod}</span></div>
                      <div className="detail-item"><span className="detail-label">Payment Status</span><span className="detail-value">{selectedOrder.paymentStatus}</span></div>
                    </div>

                    <div className="orders-acceptance-card">
                      <p><strong>Request Status:</strong> {selectedOrder.requestStatus}</p>
                      {selectedOrder.requestStatus === 'Rejected' && selectedOrder.rejectionReason && (
                        <p><strong>Rejection Reason:</strong> {selectedOrder.rejectionReason}</p>
                      )}
                      {selectedOrder.paymentMethod === 'GCash' && (
                        <div className="orders-proof-card">
                          <strong>GCash Proof of Payment</strong>
                          <div className="orders-proof-placeholder">
                            <span className="orders-proof-icon">IMG</span>
                            <p>{selectedOrder.proofOfPayment || 'Awaiting uploaded proof of payment screenshot.'}</p>
                          </div>
                        </div>
                      )}
                      <div className="orders-rider-row">
                        <label htmlFor="rider-select">Assign Rider:</label>
                        <select id="rider-select" className="orders-inline-select" value={selectedOrder.rider?.name || ''} onChange={(event) => handleAssignRider(event.target.value)}>
                          <option value="">Select rider</option>
                          {riders.map((rider) => <option key={rider.id} value={rider.name}>{rider.name}</option>)}
                        </select>
                      </div>
                      {selectedOrder.requestStatus === 'Pending Request' && (
                        <div className="orders-request-actions">
                          <button type="button" className="update-status-btn" onClick={handleAcceptOrderRequest}>Accept Order Request</button>
                          <button type="button" className="orders-reject-btn" onClick={() => setRejectionModal({ open: true, reason: 'Payment not received', otherReason: '' })}>
                            Reject Request
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="order-items-section">
                    <h3>Order Items</h3>
                    <table className="order-items-table">
                      <thead>
                        <tr><th>Product</th><th>Quantity</th><th>Price</th><th>Total</th></tr>
                      </thead>
                      <tbody>
                        {selectedOrder.items.map((item, index) => (
                          <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{formatCurrency(item.price)}</td>
                            <td className="item-total">{formatCurrency(item.total)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="orders-items-summary">
                      <div><span>Order Total</span><strong>{formatCurrency(selectedOrder.total)}</strong></div>
                    </div>
                  </div>
                </div>
              )}

              {activeModalTab === 'tracking' && (
                <div className="delivery-tracker-card">
                  <div className="tracker-header">
                    <div>
                      <span className="detail-label">ETA</span>
                      <input type="text" className="orders-inline-input" value={selectedOrder.eta} onChange={(event) => handleUpdateEta(event.target.value)} />
                    </div>
                    <div>
                      <span className="detail-label">Current Status</span>
                      <span className={getStatusClass(selectedOrder.status)}>{selectedOrder.status}</span>
                    </div>
                  </div>

                  <div className="tracker-rider">
                    <h4>Rider Details</h4>
                    {selectedOrder.rider ? (
                      <div className="tracker-rider-grid">
                        <div><strong>Rider Name:</strong> {selectedOrder.rider.name}</div>
                        <div><strong>Contact Number:</strong> {selectedOrder.rider.contact}</div>
                        <div><strong>Vehicle Type:</strong> {selectedOrder.rider.vehicle}</div>
                        <div><strong>Plate Number:</strong> {selectedOrder.rider.plateNumber}</div>
                      </div>
                    ) : (
                      <p className="tracker-no-rider">No rider assigned yet.</p>
                    )}
                  </div>

                  <div className="tracker-timeline">
                    <h4>Order Timeline</h4>
                    {selectedOrder.timeline.map((step, index) => (
                      <div key={step.key} className={`tracker-step ${step.completed ? 'done' : ''}`}>
                        <button
                          type="button"
                          className={`tracker-step-dot ${step.completed ? 'done' : ''}`}
                          onClick={() => handleSetTimelineProgress(index)}
                          aria-label={`Set ${step.title} as current status`}
                        />
                        <div className="tracker-step-content">
                          <strong>{step.title}</strong>
                          <p>{step.description}</p>
                          <input type="text" className="orders-inline-input" placeholder="Timestamp" value={step.timestamp} onChange={(event) => handleTimelineUpdate(index, 'timestamp', event.target.value)} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="modal-actions"><button className="close-modal-btn" onClick={handleCloseModal}>Close</button></div>
            </div>
          </div>
        </div>
      )}

      {rejectionModal.open && selectedOrder && (
        <div className="modal-overlay" onClick={() => setRejectionModal({ open: false, reason: 'Payment not received', otherReason: '' })}>
          <div className="orders-rejection-modal" onClick={(event) => event.stopPropagation()}>
            <h3>Reject Request - {selectedOrder.id}</h3>
            <p>Select a rejection reason:</p>
            <select
              className="orders-inline-select"
              value={rejectionModal.reason}
              onChange={(event) => setRejectionModal((prev) => ({ ...prev, reason: event.target.value }))}
            >
              {REJECTION_REASONS.map((reason) => <option key={reason}>{reason}</option>)}
            </select>
            {rejectionModal.reason === 'Other' && (
              <textarea
                className="orders-reason-input"
                placeholder="Enter custom reason"
                value={rejectionModal.otherReason}
                onChange={(event) => setRejectionModal((prev) => ({ ...prev, otherReason: event.target.value }))}
              />
            )}
            <div className="orders-rejection-actions">
              <button type="button" className="close-modal-btn" onClick={() => setRejectionModal({ open: false, reason: 'Payment not received', otherReason: '' })}>
                Cancel
              </button>
              <button type="button" className="orders-reject-btn" onClick={confirmRejectOrder}>
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}

      <EditTotalModal
        open={totalEditModal.open}
        title="Edit Order Total"
        description="Update admin total while keeping the customer/base total as reference."
        value={totalEditModal.value}
        onChange={(value) => setTotalEditModal((prev) => ({ ...prev, value }))}
        onClose={() => setTotalEditModal({ open: false, orderId: '', value: '' })}
        onSave={() => handleSaveTotal(totalEditModal.orderId)}
      />
    </div>
  );
}

Orders.propTypes = {
  onNotificationCountChange: PropTypes.func
};

export default Orders;
