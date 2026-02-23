// components/Orders.jsx
import React, { useState } from 'react';
import './Orders.css';

function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Orders data with more details for modal view
  const [orders, setOrders] = useState([
    { 
      id: 'ORD001', 
      customer: 'John Doe', 
      email: 'john.doe@email.com',
      phone: '+63 912 345 6789',
      date: '2024-01-15', 
      items: [
        { name: 'JerHigh Dog Treats 70g', quantity: 2, price: 119, total: 238 },
        { name: 'Pet Toy Braided Rope 17cm', quantity: 1, price: 25, total: 25 }
      ], 
      total: 1250, 
      status: 'Pending',
      paymentMethod: 'Cash on Delivery',
      shippingAddress: '123 Main St, Manila, Philippines'
    },
    { 
      id: 'ORD002', 
      customer: 'Jane Smith', 
      email: 'jane.smith@email.com',
      phone: '+63 923 456 7890',
      date: '2024-01-15', 
      items: [
        { name: 'CatCare Cat Food 1kg', quantity: 1, price: 279, total: 279 },
        { name: 'Puroreety Cat Litter Sand', quantity: 1, price: 115, total: 115 }
      ], 
      total: 850, 
      status: 'Processing',
      paymentMethod: 'Credit Card',
      shippingAddress: '456 Oak Ave, Quezon City, Philippines'
    },
    { 
      id: 'ORD003', 
      customer: 'Bob Wilson', 
      email: 'bob.wilson@email.com',
      phone: '+63 934 567 8901',
      date: '2024-01-14', 
      items: [
        { name: '1KG Vitality Value Meal Adult', quantity: 3, price: 190, total: 570 },
        { name: 'Petplus Doggie Biscuit 80g', quantity: 2, price: 95, total: 190 },
        { name: 'Dextrovert Pet Dextrose Powder', quantity: 1, price: 65, total: 65 }
      ], 
      total: 2300, 
      status: 'Completed',
      paymentMethod: 'GCash',
      shippingAddress: '789 Pine St, Cebu City, Philippines'
    },
    { 
      id: 'ORD004', 
      customer: 'Alice Brown', 
      email: 'alice.brown@email.com',
      phone: '+63 945 678 9012',
      date: '2024-01-14', 
      items: [
        { name: 'Pawpy DOX50 Doxycycline Syrup', quantity: 1, price: 289, total: 289 }
      ], 
      total: 299, 
      status: 'Completed',
      paymentMethod: 'Cash on Delivery',
      shippingAddress: '321 Cedar Rd, Davao City, Philippines'
    },
    { 
      id: 'ORD005', 
      customer: 'Charlie Davis', 
      email: 'charlie.davis@email.com',
      phone: '+63 956 789 0123',
      date: '2024-01-13', 
      items: [
        { name: 'JerHigh Dog Treats 70g', quantity: 3, price: 119, total: 357 },
        { name: 'CatCare Cat Food 1kg', quantity: 2, price: 279, total: 558 },
        { name: 'Pet Toy Braided Rope 17cm', quantity: 2, price: 25, total: 50 }
      ], 
      total: 1750, 
      status: 'Cancelled',
      paymentMethod: 'Credit Card',
      shippingAddress: '654 Birch Ln, Makati City, Philippines'
    }
  ]);

  // Stats data
  const stats = [
    { label: 'Total Orders', value: orders.length.toString().padStart(2, '0') },
    { label: 'Pending', value: orders.filter(o => o.status === 'Pending').length.toString().padStart(2, '0') },
    { label: 'Processing', value: orders.filter(o => o.status === 'Processing').length.toString().padStart(2, '0') },
    { label: 'Completed', value: orders.filter(o => o.status === 'Completed').length.toString().padStart(2, '0') }
  ];

  // Filter orders based on search and status filter
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All Status' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleUpdateStatus = () => {
    // This would open a status update modal in a real app
    alert('Update status functionality would open here');
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `₱${amount.toFixed(2)}`;
  };

  // Get status badge class
  const getStatusClass = (status) => {
    return `order-status-badge status-${status.toLowerCase()}`;
  };

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>Orders</h1>
        <p>Manage customer orders and track shipments.</p>
      </div>

      {/* Stats Cards */}
      <div className="orders-stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <h3>{stat.label}</h3>
            <div className="stat-number">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="orders-filters">
        <input
          type="text"
          className="orders-search-input"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="orders-filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All Status</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td><strong>{order.id}</strong></td>
                  <td>{order.customer}</td>
                  <td>{order.date}</td>
                  <td>{order.items.length} items</td>
                  <td>{formatCurrency(order.total)}</td>
                  <td>
                    <span className={getStatusClass(order.status)}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="view-details-btn"
                      onClick={() => handleViewDetails(order)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                  No orders found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Details - {selectedOrder.id}</h2>
              <button className="close-btn" onClick={handleCloseModal}>×</button>
            </div>
            
            <div className="modal-body">
              {/* Customer Information */}
              <div className="order-details-grid">
                <div className="detail-item">
                  <span className="detail-label">Customer</span>
                  <span className="detail-value">{selectedOrder.customer}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{selectedOrder.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">{selectedOrder.phone}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Order Date</span>
                  <span className="detail-value">{selectedOrder.date}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Payment Method</span>
                  <span className="detail-value">{selectedOrder.paymentMethod}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status</span>
                  <span className={getStatusClass(selectedOrder.status)}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              {/* Shipping Address */}
              <div style={{ marginBottom: '20px', padding: '12px', background: '#fafafa', borderRadius: '8px' }}>
                <span className="detail-label">Shipping Address</span>
                <p style={{ marginTop: '4px', color: '#333' }}>{selectedOrder.shippingAddress}</p>
              </div>

              {/* Order Items */}
              <div className="order-items-section">
                <h3>Order Items</h3>
                <table className="order-items-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
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
              </div>

              {/* Order Summary */}
              <div className="order-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatCurrency(selectedOrder.total * 0.9)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{formatCurrency(50)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>{formatCurrency(selectedOrder.total * 0.1 - 50)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>{formatCurrency(selectedOrder.total)}</span>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="modal-actions">
                <button className="close-modal-btn" onClick={handleCloseModal}>
                  Close
                </button>
                <button className="update-status-btn" onClick={handleUpdateStatus}>
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;