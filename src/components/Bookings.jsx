import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import './Bookings.css';
import NotificationBell from './shared/NotificationBell';
import EditTotalModal from './shared/EditTotalModal';

const SERVICE_TABS = ['All', 'Grooming', 'Boarding', 'Birthday Party'];
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

/**
 * @typedef {{ name: string, phone: string, owner: string, email: string }} BookingContact
 * @typedef {{ name: string, type: string, size: string, breed: string }} BookingPet
 * @typedef {{ baseTotal: number, total: number, downPaymentRequired: number, history: { amount: number, note: string, timestamp: string }[] }} BookingPricing
 * @typedef {{ method: 'Cash'|'GCash', status: string, referenceId?: string, proofOfPayment?: string }} BookingPayment
 * @typedef {{ services: string[], addOns: string[], includes: string[] }} GroomingSummary
 * @typedef {{ checkIn: string, checkOut: string, checkOutTime: string, duration: string, description: string }} BoardingSummary
 * @typedef {{ guests: number, packageDetails: string[], consumables: string[], subtotal: number }} BirthdaySummary
 * @typedef {{ id: string, category: 'Grooming'|'Boarding'|'Birthday Party', title: string, appointmentDate: string, appointmentTime: string, contact: BookingContact, pet: BookingPet, pricing: BookingPricing, payment: BookingPayment, status: 'Pending Approval'|'Confirmed'|'Completed'|'Cancelled'|'Rejected', rejectionReason?: string, groomingSummary?: GroomingSummary, boardingSummary?: BoardingSummary, birthdaySummary?: BirthdaySummary }} BookingItem
 */

/**
 * @param {{ onNotificationCountChange?: (count: number) => void }} props
 */
function Bookings({ onNotificationCountChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [selectedBooking, setSelectedBooking] = useState(/** @type {BookingItem | null} */(null));
  const [totalEditModal, setTotalEditModal] = useState({ open: false, bookingId: '', value: '' });
  const [rejectionModal, setRejectionModal] = useState({ open: false, reason: 'Payment not received', otherReason: '' });

  const [bookings, setBookings] = useState(/** @type {BookingItem[]} */([
    {
      id: 'BID #0035',
      category: 'Grooming',
      title: 'Dog Grooming Deluxe',
      appointmentDate: '03/10/2026',
      appointmentTime: '10:00 AM - 11:00 AM',
      contact: { name: 'Schemiy Rein', owner: 'Schemiy Rein', phone: '0917-222-9876', email: 'schemiy@email.com' },
      pet: { name: 'Bruno', type: 'Dog', size: 'Medium', breed: 'Beagle' },
      pricing: { baseTotal: 850, total: 850, downPaymentRequired: 0, history: [{ amount: 850, note: 'Customer-side default total', timestamp: '2026-03-10 09:00 AM' }] },
      payment: { method: 'Cash', status: 'Paid' },
      status: 'Confirmed',
      groomingSummary: {
        services: ['Bath', 'Haircut', 'Nail Trim'],
        addOns: ['Teeth Brushing'],
        includes: ['Shampoo', 'Drying', 'Ear Cleaning']
      }
    },
    {
      id: 'BID #0033',
      category: 'Boarding',
      title: 'Boarding',
      appointmentDate: '03/10/2026',
      appointmentTime: '6:00 PM - Next Day 9:00 AM',
      contact: { name: 'Kristiana Tiu', owner: 'Kristiana Tiu', phone: '0916-998-1234', email: 'kristiana@email.com' },
      pet: { name: 'Luna', type: 'Dog', size: 'Large', breed: 'Labrador' },
      pricing: { baseTotal: 1299, total: 1299, downPaymentRequired: 0, history: [{ amount: 1299, note: 'Customer-side default total', timestamp: '2026-03-10 09:05 AM' }] },
      payment: { method: 'Cash', status: 'Pending' },
      status: 'Pending Approval',
      boardingSummary: {
        checkIn: '2026-03-10 6:00 PM',
        checkOut: '2026-03-11',
        checkOutTime: '9:00 AM',
        duration: '15 hours',
        description: 'Overnight boarding with evening and morning feeding.'
      }
    },
    {
      id: 'BID #0036',
      category: 'Birthday Party',
      title: 'Birthday Party Gold Package',
      appointmentDate: '03/12/2026',
      appointmentTime: '3:00 PM - 7:00 PM',
      contact: { name: 'Kerizo Rafael', owner: 'Kerizo Rafael', phone: '0918-111-2233', email: 'kerizo@email.com' },
      pet: { name: 'Milo', type: 'Dog', size: 'Small', breed: 'Shih Tzu' },
      pricing: { baseTotal: 2000, total: 2000, downPaymentRequired: 1000, history: [{ amount: 2000, note: 'Customer-side default total', timestamp: '2026-03-10 09:10 AM' }] },
      payment: { method: 'GCash', status: 'Pending', referenceId: 'GC-12345', proofOfPayment: 'Uploaded screenshot placeholder' },
      status: 'Pending Approval',
      birthdaySummary: {
        guests: 10,
        packageDetails: ['Birthday Banner', 'Pet Cake', 'Pasta', 'Party Hat', 'Photo Backdrop'],
        consumables: ['Paper Plates', 'Utensils', 'Party Cups'],
        subtotal: 2000
      }
    }
  ]));

  const notifications = useMemo(
    () => bookings.map((booking) => ({
      id: booking.id,
      title: booking.category === 'Birthday Party' ? 'Birthday Party Approval Needed' : 'Pending Booking Request',
      message: `${booking.contact.name} - ${booking.title}`,
      time: 'New',
      read: booking.status !== 'Pending Approval',
      status: booking.status === 'Pending Approval' ? 'pending' : booking.status === 'Rejected' ? 'rejected' : 'accepted'
    })),
    [bookings]
  );

  useEffect(() => {
    if (onNotificationCountChange) {
      onNotificationCountChange(bookings.filter((booking) => booking.status === 'Pending Approval').length);
    }
  }, [bookings, onNotificationCountChange]);

  const filteredBookings = bookings.filter((booking) => {
    const searchInput = searchTerm.toLowerCase();
    const matchesSearch = booking.contact.name.toLowerCase().includes(searchInput)
      || booking.id.toLowerCase().includes(searchInput)
      || booking.title.toLowerCase().includes(searchInput);

    const matchesStatus = statusFilter === 'All Status' || booking.status === statusFilter;
    const matchesService = serviceFilter === 'All' || booking.category === serviceFilter;

    return matchesSearch && matchesStatus && matchesService;
  });

  const getPaymentMethodOptions = (category) => {
    if (category === 'Birthday Party') return ['GCash', 'Cash'];
    return ['Cash'];
  };

  /** @param {string} notificationId */
  const handleNotificationClick = (notificationId) => {
    const booking = bookings.find((item) => item.id === notificationId);
    if (!booking) return;
    setSelectedBooking(booking);
  };

  /** @param {string} bookingId @param {Partial<BookingItem>} updates */
  const handleUpdateBooking = (bookingId, updates) => {
    setBookings((prev) => prev.map((booking) => (booking.id === bookingId ? { ...booking, ...updates } : booking)));
    setSelectedBooking((prev) => (prev && prev.id === bookingId ? { ...prev, ...updates } : prev));
  };

  /** @param {string} bookingId @param {'method'|'status'} field @param {string} value */
  const handleUpdatePayment = (bookingId, field, value) => {
    setBookings((prev) => prev.map((booking) => (
      booking.id === bookingId
        ? { ...booking, payment: { ...booking.payment, [field]: value } }
        : booking
    )));

    setSelectedBooking((prev) => (prev && prev.id === bookingId
      ? { ...prev, payment: { ...prev.payment, [field]: value } }
      : prev));
  };

  /** @param {BookingItem} booking */
  const handleEditTotalStart = (booking) => {
    setTotalEditModal({ open: true, bookingId: booking.id, value: String(booking.pricing.total) });
  };

  /** @param {string} bookingId */
  const handleSaveTotal = (bookingId) => {
    const parsed = Number(totalEditModal.value);
    if (Number.isNaN(parsed) || parsed < 0) return;

    setBookings((prev) => prev.map((booking) => (
      booking.id === bookingId
        ? {
            ...booking,
            pricing: {
              ...booking.pricing,
              total: parsed,
              history: [
                ...(booking.pricing.history || []),
                { amount: parsed, note: 'Admin override', timestamp: new Date().toLocaleString() }
              ]
            }
          }
        : booking
    )));

    setSelectedBooking((prev) => (prev && prev.id === bookingId
      ? {
          ...prev,
          pricing: {
            ...prev.pricing,
            total: parsed,
            history: [
              ...(prev.pricing.history || []),
              { amount: parsed, note: 'Admin override', timestamp: new Date().toLocaleString() }
            ]
          }
        }
      : prev));

    setTotalEditModal({ open: false, bookingId: '', value: '' });
  };

  /** @param {BookingItem} booking */
  const handleAcceptBookingRequest = (booking) => {
    handleUpdateBooking(booking.id, { status: 'Confirmed', rejectionReason: '' });
    if (booking.category === 'Birthday Party') {
      handleUpdatePayment(booking.id, 'status', 'Down Payment');
    }
  };

  const confirmRejectBooking = () => {
    if (!selectedBooking) return;
    const finalReason = rejectionModal.reason === 'Other' ? rejectionModal.otherReason.trim() : rejectionModal.reason;
    if (!finalReason) return;
    handleUpdateBooking(selectedBooking.id, { status: 'Rejected', rejectionReason: finalReason });
    setRejectionModal({ open: false, reason: 'Payment not received', otherReason: '' });
  };

  return (
    <div className="bookings-wrapper">
      <div className="bookings-header bookings-header--with-actions">
        <div>
          <h1 className="bookings-header__title">Bookings</h1>
          <p className="bookings-header__subtitle">Manage bookings, approvals, payment details, and manual totals.</p>
        </div>
        <NotificationBell notifications={notifications} title="Booking Requests" onNotificationClick={handleNotificationClick} />
      </div>

      <div className="bookings-tabs" role="tablist" aria-label="Service categories">
        {SERVICE_TABS.map((tab) => (
          <button key={tab} type="button" className={`bookings-tab ${serviceFilter === tab ? 'active' : ''}`} onClick={() => setServiceFilter(tab)}>
            {tab}
          </button>
        ))}
      </div>

      <div className="bookings-search-section">
        <input type="text" className="bookings-search__input" placeholder="Search bookings..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
        <select className="bookings-filter__select" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option>All Status</option>
          <option>Pending Approval</option>
          <option>Confirmed</option>
          <option>Completed</option>
          <option>Cancelled</option>
          <option>Rejected</option>
        </select>
      </div>

      <div className="bookings-table-container">
        <table className="bookings-table">
          <thead className="bookings-table__header">
            <tr>
              <th className="bookings-table__header-cell">Service Type</th>
              <th className="bookings-table__header-cell">Customer</th>
              <th className="bookings-table__header-cell">Booking ID</th>
              <th className="bookings-table__header-cell">Date & Time</th>
              <th className="bookings-table__header-cell">Service Total</th>
              <th className="bookings-table__header-cell">Payment Method</th>
              <th className="bookings-table__header-cell">Payment Status</th>
              <th className="bookings-table__header-cell">Booking Status</th>
              <th className="bookings-table__header-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <tr key={booking.id} className="bookings-table__row">
                  <td className="bookings-table__cell">{booking.category}</td>
                  <td className="bookings-table__cell">{booking.contact.name}</td>
                  <td className="bookings-table__cell">{booking.id}</td>
                  <td className="bookings-table__cell">
                    <div className="bookings-date-time-cell">
                      <span>{booking.appointmentDate}</span>
                      <span>{booking.appointmentTime}</span>
                    </div>
                  </td>
                  <td className="bookings-table__cell">
                    <button type="button" className="bookings-total-trigger" onClick={() => handleEditTotalStart(booking)}>
                      ₱{booking.pricing.total.toFixed(2)}
                    </button>
                  </td>
                  <td className="bookings-table__cell">
                    <select className="bookings-payment-select" value={booking.payment.method} onChange={(event) => handleUpdatePayment(booking.id, 'method', event.target.value)}>
                      {getPaymentMethodOptions(booking.category).map((method) => (
                        <option key={method}>{method}</option>
                      ))}
                    </select>
                  </td>
                  <td className="bookings-table__cell">
                    <select className="bookings-payment-select" value={booking.payment.status} onChange={(event) => handleUpdatePayment(booking.id, 'status', event.target.value)}>
                      <option>Pending</option>
                      <option>Down Payment</option>
                      <option>Paid</option>
                      <option>Refunded</option>
                    </select>
                  </td>
                  <td className="bookings-table__cell">
                    <select className="bookings-payment-select" value={booking.status} onChange={(event) => handleUpdateBooking(booking.id, { status: /** @type {BookingItem['status']} */(event.target.value) })}>
                      <option>Pending Approval</option>
                      <option>Confirmed</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                      <option>Rejected</option>
                    </select>
                  </td>
                  <td className="bookings-table__cell">
                    <button type="button" className="bookings-view-btn" onClick={() => setSelectedBooking(booking)}>View Details</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="9" className="bookings-empty-state">No bookings found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedBooking && (
        <div className="bookings-modal-overlay" onClick={() => setSelectedBooking(null)}>
          <div className="bookings-modal" onClick={(event) => event.stopPropagation()}>
            <div className="bookings-modal__header">
              <h3>Booking Details - {selectedBooking.id}</h3>
              <button type="button" className="bookings-modal__close" onClick={() => setSelectedBooking(null)}>×</button>
            </div>

            <div className="bookings-modal__body">
              <div className="bookings-modal__summary-grid">
                <div className="bookings-summary-card">
                  <h4>Pet Info</h4>
                  <p><strong>Name:</strong> {selectedBooking.pet.name}</p>
                  <p><strong>Type:</strong> {selectedBooking.pet.type}</p>
                  <p><strong>Size:</strong> {selectedBooking.pet.size}</p>
                  <p><strong>Breed:</strong> {selectedBooking.pet.breed}</p>
                </div>

                <div className="bookings-summary-card">
                  {selectedBooking.category === 'Grooming' && <h4>Appointment</h4>}
                  {selectedBooking.category === 'Boarding' && <h4>Dates & Time</h4>}
                  {selectedBooking.category === 'Birthday Party' && <h4>Party Details</h4>}
                  {selectedBooking.category === 'Grooming' && (
                    <>
                      <p><strong>Date:</strong> {selectedBooking.appointmentDate}</p>
                      <p><strong>Time:</strong> {selectedBooking.appointmentTime}</p>
                    </>
                  )}
                  {selectedBooking.category === 'Boarding' && selectedBooking.boardingSummary && (
                    <>
                      <p><strong>Check-in:</strong> {selectedBooking.boardingSummary.checkIn}</p>
                      <p><strong>Check-out:</strong> {selectedBooking.boardingSummary.checkOut}</p>
                      <p><strong>Check-out Time:</strong> {selectedBooking.boardingSummary.checkOutTime}</p>
                    </>
                  )}
                  {selectedBooking.category === 'Birthday Party' && selectedBooking.birthdaySummary && (
                    <>
                      <p><strong>Date:</strong> {selectedBooking.appointmentDate}</p>
                      <p><strong>Time:</strong> {selectedBooking.appointmentTime}</p>
                      <p><strong>Guests:</strong> {selectedBooking.birthdaySummary.guests}</p>
                    </>
                  )}
                </div>

                <div className="bookings-summary-card">
                  <h4>Contact Info</h4>
                  <p><strong>Phone:</strong> {selectedBooking.contact.phone}</p>
                  <p><strong>Owner:</strong> {selectedBooking.contact.owner}</p>
                  <p><strong>Email:</strong> {selectedBooking.contact.email}</p>
                </div>

                <div className="bookings-summary-card">
                  {selectedBooking.category === 'Grooming' && selectedBooking.groomingSummary && (
                    <>
                      <h4>Grooming Summary</h4>
                      <p><strong>Services:</strong> {selectedBooking.groomingSummary.services.join(', ')}</p>
                      <p><strong>Add-ons:</strong> {selectedBooking.groomingSummary.addOns.join(', ') || 'None'}</p>
                      <p><strong>Includes:</strong> {selectedBooking.groomingSummary.includes.join(', ')}</p>
                    </>
                  )}
                  {selectedBooking.category === 'Boarding' && selectedBooking.boardingSummary && (
                    <>
                      <h4>Service Details</h4>
                      <p><strong>Service:</strong> {selectedBooking.title}</p>
                      <p><strong>Duration:</strong> {selectedBooking.boardingSummary.duration}</p>
                      <p><strong>Description:</strong> {selectedBooking.boardingSummary.description}</p>
                    </>
                  )}
                  {selectedBooking.category === 'Birthday Party' && selectedBooking.birthdaySummary && (
                    <>
                      <h4>Package Details</h4>
                      <p><strong>Inclusions:</strong> {selectedBooking.birthdaySummary.packageDetails.join(', ')}</p>
                      <p><strong>Consumables:</strong> {selectedBooking.birthdaySummary.consumables.join(', ')}</p>
                      <p><strong>Subtotal:</strong> ₱{selectedBooking.birthdaySummary.subtotal.toFixed(2)}</p>
                    </>
                  )}
                </div>
              </div>

              <div className="bookings-modal__section">
                <strong>Total Price</strong>
                <p>
                  Current Total: ₱{selectedBooking.pricing.total.toFixed(2)}
                </p>
                <div className="bookings-history-list">
                  {selectedBooking.pricing.history.map((entry, index) => (
                    <div key={`${entry.timestamp}-${index}`} className="bookings-history-item">
                      <span>₱{entry.amount.toFixed(2)} - {entry.note}</span>
                      <span>{entry.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedBooking.status === 'Rejected' && selectedBooking.rejectionReason && (
                <div className="bookings-modal__section">
                  <strong>Rejection Reason</strong>
                  <p>{selectedBooking.rejectionReason}</p>
                </div>
              )}

              {selectedBooking.status === 'Pending Approval' && (
                <div className="bookings-approval-card">
                  <h4>Request Actions</h4>
                  {selectedBooking.payment.method === 'GCash' && (
                    <div className="bookings-proof-card">
                      <strong>GCash Proof of Payment</strong>
                      <div className="bookings-proof-placeholder">
                        <span className="bookings-proof-icon">IMG</span>
                        <div>
                          <p>{selectedBooking.payment.proofOfPayment || 'Awaiting uploaded proof of payment screenshot.'}</p>
                          {selectedBooking.payment.referenceId && <span>Reference ID: {selectedBooking.payment.referenceId}</span>}
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedBooking.category === 'Birthday Party' && (
                    <p>Required down payment: <strong>₱{selectedBooking.pricing.downPaymentRequired.toFixed(2)}</strong></p>
                  )}
                  <p>Review details first before accepting or rejecting this request.</p>
                  <div className="bookings-request-actions">
                    <button type="button" className="bookings-accept-btn" onClick={() => handleAcceptBookingRequest(selectedBooking)}>
                      Accept Booking Request
                    </button>
                    <button type="button" className="bookings-reject-btn" onClick={() => setRejectionModal({ open: true, reason: 'Payment not received', otherReason: '' })}>
                      Reject Request
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {rejectionModal.open && selectedBooking && (
        <div className="bookings-modal-overlay" onClick={() => setRejectionModal({ open: false, reason: 'Payment not received', otherReason: '' })}>
          <div className="bookings-rejection-modal" onClick={(event) => event.stopPropagation()}>
            <h3>Reject Request - {selectedBooking.id}</h3>
            <p>Select a rejection reason:</p>
            <select className="bookings-payment-select" value={rejectionModal.reason} onChange={(event) => setRejectionModal((prev) => ({ ...prev, reason: event.target.value }))}>
              {REJECTION_REASONS.map((reason) => <option key={reason}>{reason}</option>)}
            </select>
            {rejectionModal.reason === 'Other' && (
              <textarea className="bookings-reason-input" placeholder="Enter custom reason" value={rejectionModal.otherReason} onChange={(event) => setRejectionModal((prev) => ({ ...prev, otherReason: event.target.value }))} />
            )}
            <div className="bookings-request-actions">
              <button type="button" className="bookings-reject-btn" onClick={() => setRejectionModal({ open: false, reason: 'Payment not received', otherReason: '' })}>Cancel</button>
              <button type="button" className="bookings-accept-btn" onClick={confirmRejectBooking}>Confirm Reject</button>
            </div>
          </div>
        </div>
      )}

      <EditTotalModal
        open={totalEditModal.open}
        title="Edit Service Total"
        description="Update admin total while preserving the customer-side base total."
        value={totalEditModal.value}
        onChange={(value) => setTotalEditModal((prev) => ({ ...prev, value }))}
        onClose={() => setTotalEditModal({ open: false, bookingId: '', value: '' })}
        onSave={() => handleSaveTotal(totalEditModal.bookingId)}
      />
    </div>
  );
}

Bookings.propTypes = {
  onNotificationCountChange: PropTypes.func
};

export default Bookings;
