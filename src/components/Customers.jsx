import React, { useState } from 'react';
import './Customers.css';

function Customers() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Expanded customers data
  const customers = [
    {
      id: 'C1001',
      name: 'Ken Zo',
      contact: '09123456789',
      email: 'kenzo@pagisbigan.com',
      status: 'Active',
      loyaltyPoints: 250,
      accountCreated: '2023-01-15',
      lastActive: '2024-02-20',
      totalOrders: 15,
      totalSpent: 4250.75
    },
    {
      id: 'C1002',
      name: 'Maria Santos',
      contact: '09234567890',
      email: 'maria.santos@email.com',
      status: 'Active',
      loyaltyPoints: 480,
      accountCreated: '2023-03-20',
      lastActive: '2024-02-21',
      totalOrders: 24,
      totalSpent: 6780.50
    },
    {
      id: 'C1003',
      name: 'John Reyes',
      contact: '09345678901',
      email: 'john.reyes@email.com',
      status: 'Inactive',
      loyaltyPoints: 120,
      accountCreated: '2023-06-10',
      lastActive: '2024-01-05',
      totalOrders: 8,
      totalSpent: 2150.25
    },
    {
      id: 'C1004',
      name: 'Ana Dela Cruz',
      contact: '09456789012',
      email: 'ana.delacruz@email.com',
      status: 'Active',
      loyaltyPoints: 650,
      accountCreated: '2023-02-05',
      lastActive: '2024-02-22',
      totalOrders: 32,
      totalSpent: 8920.30
    },
    {
      id: 'C1005',
      name: 'Pedro Garcia',
      contact: '09567890123',
      email: 'pedro.garcia@email.com',
      status: 'Active',
      loyaltyPoints: 310,
      accountCreated: '2023-08-12',
      lastActive: '2024-02-19',
      totalOrders: 12,
      totalSpent: 3450.00
    },
    {
      id: 'C1006',
      name: 'Luisa Fernandez',
      contact: '09678901234',
      email: 'luisa.fernandez@email.com',
      status: 'Inactive',
      loyaltyPoints: 85,
      accountCreated: '2023-11-20',
      lastActive: '2024-01-28',
      totalOrders: 5,
      totalSpent: 1275.50
    },
    {
      id: 'C1007',
      name: 'Carlos Mendoza',
      contact: '09789012345',
      email: 'carlos.mendoza@email.com',
      status: 'Active',
      loyaltyPoints: 520,
      accountCreated: '2023-04-18',
      lastActive: '2024-02-21',
      totalOrders: 28,
      totalSpent: 7340.80
    },
    {
      id: 'C1008',
      name: 'Sofia Villanueva',
      contact: '09890123456',
      email: 'sofia.villanueva@email.com',
      status: 'Active',
      loyaltyPoints: 190,
      accountCreated: '2023-09-30',
      lastActive: '2024-02-18',
      totalOrders: 9,
      totalSpent: 2890.45
    }
  ];

  const pets = [
    { id: 'P001', name: 'Max', species: 'Dog', breed: 'Golden Retriever', age: 3, customerId: 'C1001' },
    { id: 'P002', name: 'Luna', species: 'Cat', breed: 'Persian', age: 2, customerId: 'C1001' },
    { id: 'P003', name: 'Bella', species: 'Dog', breed: 'Shih Tzu', age: 4, customerId: 'C1002' },
    { id: 'P004', name: 'Milo', species: 'Dog', breed: 'Poodle', age: 1, customerId: 'C1002' },
    { id: 'P005', name: 'Coco', species: 'Cat', breed: 'Siamese', age: 2, customerId: 'C1002' },
    { id: 'P006', name: 'Charlie', species: 'Dog', breed: 'Beagle', age: 5, customerId: 'C1003' },
    { id: 'P007', name: 'Rocky', species: 'Dog', breed: 'German Shepherd', age: 3, customerId: 'C1004' },
    { id: 'P008', name: 'Mimi', species: 'Cat', breed: 'Bengal', age: 2, customerId: 'C1004' },
    { id: 'P009', name: 'Buddy', species: 'Dog', breed: 'Labrador', age: 4, customerId: 'C1005' },
    { id: 'P010', name: 'Oreo', species: 'Cat', breed: 'British Shorthair', age: 1, customerId: 'C1006' },
    { id: 'P011', name: 'Rocky', species: 'Dog', breed: 'Rottweiler', age: 3, customerId: 'C1007' },
    { id: 'P012', name: 'Lucky', species: 'Dog', breed: 'Chihuahua', age: 2, customerId: 'C1008' }
  ];

  const orders = [
    { id: 'ORD001', date: '2024-02-15', status: 'Completed', amount: 25.50, customerId: 'C1001' },
    { id: 'ORD002', date: '2024-02-14', status: 'Completed', amount: 32.00, customerId: 'C1001' },
    { id: 'ORD003', date: '2024-02-13', status: 'Pending', amount: 18.75, customerId: 'C1001' },
    { id: 'ORD004', date: '2024-02-15', status: 'Completed', amount: 45.00, customerId: 'C1002' },
    { id: 'ORD005', date: '2024-02-12', status: 'Completed', amount: 28.50, customerId: 'C1002' },
    { id: 'ORD006', date: '2024-02-10', status: 'Completed', amount: 15.25, customerId: 'C1002' },
    { id: 'ORD007', date: '2024-02-08', status: 'Completed', amount: 22.30, customerId: 'C1002' },
    { id: 'ORD008', date: '2024-01-25', status: 'Completed', amount: 35.00, customerId: 'C1003' },
    { id: 'ORD009', date: '2024-02-16', status: 'Pending', amount: 42.50, customerId: 'C1004' },
    { id: 'ORD010', date: '2024-02-15', status: 'Completed', amount: 67.80, customerId: 'C1004' },
    { id: 'ORD011', date: '2024-02-14', status: 'Completed', amount: 23.40, customerId: 'C1005' },
    { id: 'ORD012', date: '2024-02-13', status: 'Completed', amount: 89.20, customerId: 'C1006' },
    { id: 'ORD013', date: '2024-02-12', status: 'Completed', amount: 34.60, customerId: 'C1007' },
    { id: 'ORD014', date: '2024-02-11', status: 'Pending', amount: 56.70, customerId: 'C1008' }
  ];

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCustomer(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const getCustomerPets = (customerId) => {
    return pets.filter(pet => pet.customerId === customerId);
  };

  const getCustomerOrders = (customerId) => {
    return orders.filter(order => order.customerId === customerId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Filter customers based on search and status
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contact.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || customer.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="customers-wrapper">
      <div className="customers-header">
        <h1 className="customers-header__title">Customer Management</h1>
        <p className="customers-header__subtitle">Manage and view customer information, pets, and order history.</p>
      </div>

      {/* Search and Filter Section */}
      <div className="customers-search-section">
        <input
          type="text"
          placeholder="Search by name, ID, email, or contact..."
          value={searchTerm}
          onChange={handleSearch}
          className="customers-search__input"
        />
        
        <select 
          value={statusFilter} 
          onChange={handleStatusFilter}
          className="customers-filter__select"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Customers Table */}
      <div className="customers-table-container">
        <table className="customers-table">
          <thead className="customers-table__header">
            <tr>
              <th className="customers-table__header-cell">Customer ID</th>
              <th className="customers-table__header-cell">Name</th>
              <th className="customers-table__header-cell">Contact</th>
              <th className="customers-table__header-cell">Email</th>
              <th className="customers-table__header-cell">Status</th>
              <th className="customers-table__header-cell">Loyalty Points</th>
              <th className="customers-table__header-cell">Account Created</th>
              <th className="customers-table__header-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map(customer => (
                <tr key={customer.id} className="customers-table__row">
                  <td className="customers-table__cell">
                    <span className="customers-id-badge">{customer.id}</span>
                  </td>
                  <td className="customers-table__cell">{customer.name}</td>
                  <td className="customers-table__cell">{customer.contact}</td>
                  <td className="customers-table__cell">{customer.email}</td>
                  <td className="customers-table__cell">
                    <span className={`customers-status-badge customers-status-badge--${customer.status.toLowerCase()}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="customers-table__cell">
                    <span className="customers-loyalty-points">{customer.loyaltyPoints} pts</span>
                  </td>
                  <td className="customers-table__cell">{formatDate(customer.accountCreated)}</td>
                  <td className="customers-table__cell">
                    <button 
                      className="customers-view-btn"
                      onClick={() => handleViewDetails(customer)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="customers-table__cell customers-empty-state">
                  No customers found matching your search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        {/* Results count */}
        <div className="customers-results-count">
          Showing {filteredCustomers.length} of {customers.length} customers
        </div>
      </div>

      {/* Modal for Customer Details */}
      {showModal && selectedCustomer && (
        <div className="customers-modal-overlay" onClick={handleCloseModal}>
          <div className="customers-modal" onClick={e => e.stopPropagation()}>
            <div className="customers-modal__header">
              <h2 className="customers-modal__title">Customer Details</h2>
              <button className="customers-modal__close" onClick={handleCloseModal}>×</button>
            </div>

            <div className="customers-modal__body">
              {/* Customer Profile Card */}
              <div className="customers-profile-card">
                <div className="customers-profile__header">
                  <div className="customers-profile__id">{selectedCustomer.id}</div>
                  <span className={`customers-status-badge customers-status-badge--${selectedCustomer.status.toLowerCase()}`}>
                    {selectedCustomer.status}
                  </span>
                </div>
                
                <div className="customers-profile__info">
                  <div className="customers-profile__row">
                    <div className="customers-profile__group">
                      <span className="customers-profile__label">Full Name</span>
                      <span className="customers-profile__value">{selectedCustomer.name}</span>
                    </div>
                    <div className="customers-profile__group">
                      <span className="customers-profile__label">Contact</span>
                      <span className="customers-profile__value">{selectedCustomer.contact}</span>
                    </div>
                  </div>
                  
                  <div className="customers-profile__row">
                    <div className="customers-profile__group">
                      <span className="customers-profile__label">Email</span>
                      <span className="customers-profile__value">{selectedCustomer.email}</span>
                    </div>
                    <div className="customers-profile__group">
                      <span className="customers-profile__label">Member Since</span>
                      <span className="customers-profile__value">{formatDate(selectedCustomer.accountCreated)}</span>
                    </div>
                  </div>
                </div>

                <div className="customers-profile__stats">
                  <div className="customers-profile__stat">
                    <span className="customers-profile__stat-label">Points</span>
                    <span className="customers-profile__stat-value">{selectedCustomer.loyaltyPoints}</span>
                  </div>
                  <div className="customers-profile__stat">
                    <span className="customers-profile__stat-label">Orders</span>
                    <span className="customers-profile__stat-value">{selectedCustomer.totalOrders}</span>
                  </div>
                  <div className="customers-profile__stat">
                    <span className="customers-profile__stat-label">Pets</span>
                    <span className="customers-profile__stat-value">{getCustomerPets(selectedCustomer.id).length}</span>
                  </div>
                </div>
              </div>

              {/* Pets Section */}
              <div className="customers-section">
                <h3 className="customers-section__title">Registered Pets</h3>
                {getCustomerPets(selectedCustomer.id).length > 0 ? (
                  <div className="customers-pets-list">
                    {getCustomerPets(selectedCustomer.id).map((pet, index) => (
                      <div key={index} className="customers-pet-item">
                        <span className="customers-pet__name">{pet.name}</span>
                        <span className="customers-pet__details">{pet.species} • {pet.breed} • {pet.age} yrs</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="customers-no-data">No registered pets</div>
                )}
              </div>

              {/* Orders Section */}
              <div className="customers-section">
                <h3 className="customers-section__title">Recent Orders</h3>
                {getCustomerOrders(selectedCustomer.id).length > 0 ? (
                  <div className="customers-orders-list">
                    {getCustomerOrders(selectedCustomer.id).slice(0, 3).map((order, index) => (
                      <div key={index} className="customers-order-item">
                        <div className="customers-order__info">
                          <span className="customers-order__id">{order.id}</span>
                          <span className="customers-order__date">{formatDate(order.date)}</span>
                        </div>
                        <div className="customers-order__amount">₱{order.amount.toFixed(2)}</div>
                      </div>
                    ))}
                    {getCustomerOrders(selectedCustomer.id).length > 3 && (
                      <div className="customers-more-orders">
                        +{getCustomerOrders(selectedCustomer.id).length - 3} more orders
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="customers-no-data">No orders yet</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customers;