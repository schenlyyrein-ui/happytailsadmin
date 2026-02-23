import React, { useState } from 'react';
import './bookings.css';

function Bookings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  
  const [bookings, setBookings] = useState([
    {
      id: 'BID #0036',
      service: 'Birthday Pawty',
      customer: 'Kerizo Rafael',
      date: '03/10/2025',
      time: '3:00 PM - 7:00 PM',
      total: 2000,
      status: 'Paid'
    },
    {
      id: 'BID #0035',
      service: 'Grooming',
      customer: 'Schemiy Rein',
      date: '03/10/2025',
      time: '3:00 PM - 7:00 PM',
      total: 850,
      status: 'Paid'
    },
    {
      id: 'BID #0034',
      service: 'Grooming',
      customer: 'Karl Siquilan',
      date: '03/10/2025',
      time: '3:00 PM - 7:00 PM',
      total: 850,
      status: 'Paid'
    },
    {
      id: 'BID #0033',
      service: 'Pet Hotel',
      customer: 'Kristiana Tiu',
      date: '03/10/2025',
      time: '3:00 PM - 7:00 PM',
      total: 299,
      status: 'Paid'
    }
  ]);

  // Start editing a total
  const handleEditStart = (bookingId, currentTotal) => {
    setEditingId(bookingId);
    setEditValue(currentTotal.toString());
  };

  // Save the edited total
  const handleEditSave = (bookingId) => {
    const newTotal = parseFloat(editValue);
    
    // Validate the input
    if (!isNaN(newTotal) && newTotal >= 0) {
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking.id === bookingId
            ? { ...booking, total: newTotal }
            : booking
        )
      );
    }
    
    // Exit edit mode
    setEditingId(null);
    setEditValue('');
  };

  // Cancel editing
  const handleEditCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  // Handle key press (Enter to save, Escape to cancel)
  const handleKeyPress = (e, bookingId) => {
    if (e.key === 'Enter') {
      handleEditSave(bookingId);
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bookings-wrapper">
      <div className="bookings-header">
        <h1 className="bookings-header__title">Bookings</h1>
        <p className="bookings-header__subtitle">Manage your bookings and service totals.</p>
      </div>

      <div className="bookings-search-section">
        <input
          type="text"
          className="bookings-search__input"
          placeholder="Search bookings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="bookings-filter__select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All Status</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Cancelled</option>
        </select>
      </div>

      <div className="bookings-table-container">
        <table className="bookings-table">
          <thead className="bookings-table__header">
            <tr>
              <th className="bookings-table__header-cell">Service Type</th>
              <th className="bookings-table__header-cell">Customer</th>
              <th className="bookings-table__header-cell">Booking ID</th>
              <th className="bookings-table__header-cell">Booking Date</th>
              <th className="bookings-table__header-cell">Time</th>
              <th className="bookings-table__header-cell">Service Total</th>
              <th className="bookings-table__header-cell">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <tr key={booking.id} className="bookings-table__row">
                  <td className="bookings-table__cell">{booking.service}</td>
                  <td className="bookings-table__cell">{booking.customer}</td>
                  <td className="bookings-table__cell">{booking.id}</td>
                  <td className="bookings-table__cell">{booking.date}</td>
                  <td className="bookings-table__cell">{booking.time}</td>
                  <td className="bookings-table__cell">
                    {editingId === booking.id ? (
                      <div className="bookings-editable-total">
                        <div className="bookings-edit-form">
                          <input
                            type="number"
                            className="bookings-edit-input"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => handleKeyPress(e, booking.id)}
                            autoFocus
                            min="0"
                            step="0.01"
                          />
                          <div className="bookings-edit-actions">
                            <button 
                              className="bookings-save-btn"
                              onClick={() => handleEditSave(booking.id)}
                              title="Save"
                            >
                              ✓
                            </button>
                            <button 
                              className="bookings-cancel-btn"
                              onClick={handleEditCancel}
                              title="Cancel"
                            >
                              ✗
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bookings-editable-total">
                        <span 
                          className="bookings-total-value"
                          onClick={() => handleEditStart(booking.id, booking.total)}
                          title="Click to edit total"
                        >
                          ₱{booking.total.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="bookings-table__cell">
                    <span className={`bookings-status-badge bookings-status-badge--${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="bookings-empty-state">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bookings;