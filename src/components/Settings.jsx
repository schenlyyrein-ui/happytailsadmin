import React, { useState } from 'react';
import './Settings.css';

function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const [profile, setProfile] = useState({
    name: 'Alice Pogue',
    email: 'admin@happytails.com',
    phone: '+63 9666666660'
  });

  const [editedProfile, setEditedProfile] = useState({ ...profile });

  const [users, setUsers] = useState([
    { id: 1, name: 'Kenzo Rafael', email: 'admin1@happytails.com', role: 'Manager', joinedDate: '01/01/2005' },
    { id: 2, name: 'Schenly Rein', email: 'admin2@happytails.com', role: 'Staff', joinedDate: '01/01/2005' },
    { id: 3, name: 'Karl Siquian', email: 'admin3@happytails.com', role: 'Manager', joinedDate: '01/01/2005' },
    { id: 4, name: 'Kristiana Tiu', email: 'admin4@happytails.com', role: 'Staff', joinedDate: '01/01/2005' }
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Manager'
  });

  const handleProfileEdit = () => {
    setIsEditing(true);
    setEditedProfile({ ...profile });
  };

  const handleProfileSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleProfileCancel = () => {
    setEditedProfile({ ...profile });
    setIsEditing(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewUserChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditUserChange = (event) => {
    const { name, value } = event.target;
    setEditingUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = (event) => {
    event.preventDefault();
    const today = new Date();
    const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;

    const userToAdd = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      joinedDate: formattedDate
    };

    setUsers([...users, userToAdd]);
    setNewUser({ name: '', email: '', password: '', role: 'Manager' });
    setIsAddUserModalOpen(false);
  };

  const handleEditUser = (user) => {
    setEditingUser({ ...user });
    setIsEditUserModalOpen(true);
  };

  const handleUpdateUser = (event) => {
    event.preventDefault();
    setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)));
    setIsEditUserModalOpen(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase())
      || user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All Status' || user.role === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Account Settings</h1>
        <p>Manage profile and system users.</p>
      </div>

      <div className="settings-tabs" role="tablist">
        <button
          className={`settings-tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
          role="tab"
          aria-selected={activeTab === 'profile'}
        >
          Profile
        </button>
        <button
          className={`settings-tab ${activeTab === 'user-management' ? 'active' : ''}`}
          onClick={() => setActiveTab('user-management')}
          role="tab"
          aria-selected={activeTab === 'user-management'}
        >
          User Management
        </button>
      </div>

      <div className="settings-content">
        {activeTab === 'profile' && (
          <div role="tabpanel">
            <div className="content-header">
              <h2>Profile</h2>
            </div>

            <div className="profile-section">
              <div className="profile-field">
                <label htmlFor="profile-name">Name:</label>
                {isEditing ? (
                  <input id="profile-name" type="text" name="name" value={editedProfile.name} onChange={handleInputChange} />
                ) : (
                  <div className="field-value">{profile.name}</div>
                )}
              </div>

              <div className="profile-field">
                <label htmlFor="profile-email">Email:</label>
                {isEditing ? (
                  <input id="profile-email" type="email" name="email" value={editedProfile.email} onChange={handleInputChange} />
                ) : (
                  <div className="field-value">{profile.email}</div>
                )}
              </div>

              <div className="profile-field">
                <label htmlFor="profile-phone">Phone:</label>
                {isEditing ? (
                  <input id="profile-phone" type="tel" name="phone" value={editedProfile.phone} onChange={handleInputChange} />
                ) : (
                  <div className="field-value">{profile.phone}</div>
                )}
              </div>

              <div className="profile-actions">
                {isEditing ? (
                  <div className="action-group">
                    <button className="save-btn" onClick={handleProfileSave}>Save</button>
                    <button className="cancel-btn" onClick={handleProfileCancel}>Cancel</button>
                  </div>
                ) : (
                  <button className="edit-btn" onClick={handleProfileEdit}>Edit</button>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'user-management' && (
          <div role="tabpanel">
            <div className="content-header">
              <h2>User Management</h2>
            </div>

            <div className="user-management-header">
              <button className="add-user-btn" onClick={() => setIsAddUserModalOpen(true)}>Add User</button>
            </div>

            <div className="filters-row">
              <div className="search-wrapper">
                <label htmlFor="user-search" className="sr-only">Search users</label>
                <input
                  id="user-search"
                  type="text"
                  className="user-search-input"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
              <div className="filter-wrapper">
                <label htmlFor="role-filter" className="sr-only">Filter by role</label>
                <select
                  id="role-filter"
                  className="user-filter-select"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                >
                  <option>All Status</option>
                  <option>Manager</option>
                  <option>Staff</option>
                </select>
              </div>
            </div>

            <div className="table-container">
              <table className="user-table">
                <caption className="sr-only">User list</caption>
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Joined Date</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.joinedDate}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="action-edit"
                              onClick={() => handleEditUser(user)}
                              aria-label={`Edit ${user.name}`}
                            >
                              Edit
                            </button>
                            <button
                              className="action-delete"
                              onClick={() => handleDeleteUser(user.id)}
                              aria-label={`Delete ${user.name}`}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="empty-state">No users found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {isAddUserModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddUserModalOpen(false)}>
          <div className="modal-content" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="add-user-title">
            <div className="modal-header">
              <h3 id="add-user-title">Add New User</h3>
              <button className="close-btn" onClick={() => setIsAddUserModalOpen(false)} aria-label="Close modal">×</button>
            </div>

            <form onSubmit={handleAddUser}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="user-name">Full Name</label>
                  <input
                    id="user-name"
                    type="text"
                    name="name"
                    value={newUser.name}
                    onChange={handleNewUserChange}
                    required
                    placeholder="Enter full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="user-email">Email</label>
                  <input
                    id="user-email"
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleNewUserChange}
                    required
                    placeholder="Enter email address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="user-password">Password</label>
                  <input
                    id="user-password"
                    type="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleNewUserChange}
                    required
                    placeholder="Enter temporary password"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="user-role">Role</label>
                  <select id="user-role" name="role" value={newUser.role} onChange={handleNewUserChange}>
                    <option>Manager</option>
                    <option>Staff</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsAddUserModalOpen(false)}>Cancel</button>
                <button type="submit" className="save-btn">Add User</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditUserModalOpen && editingUser && (
        <div className="modal-overlay" onClick={() => setIsEditUserModalOpen(false)}>
          <div className="modal-content" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="edit-user-title">
            <div className="modal-header">
              <h3 id="edit-user-title">Edit User</h3>
              <button className="close-btn" onClick={() => setIsEditUserModalOpen(false)} aria-label="Close modal">×</button>
            </div>

            <form onSubmit={handleUpdateUser}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="edit-user-name">Full Name</label>
                  <input
                    id="edit-user-name"
                    type="text"
                    name="name"
                    value={editingUser.name}
                    onChange={handleEditUserChange}
                    required
                    placeholder="Enter full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-user-email">Email</label>
                  <input
                    id="edit-user-email"
                    type="email"
                    name="email"
                    value={editingUser.email}
                    onChange={handleEditUserChange}
                    required
                    placeholder="Enter email address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-user-role">Role</label>
                  <select
                    id="edit-user-role"
                    name="role"
                    value={editingUser.role}
                    onChange={handleEditUserChange}
                  >
                    <option>Manager</option>
                    <option>Staff</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsEditUserModalOpen(false)}>Cancel</button>
                <button type="submit" className="save-btn">Update User</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
