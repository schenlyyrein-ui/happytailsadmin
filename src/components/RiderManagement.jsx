import React, { useEffect, useState } from 'react';
import { getRiders, saveRiders } from '../data/riders';
import './RiderManagement.css';

function RiderManagement() {
  const [riders, setRiders] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    vehicle: '',
    plateNumber: ''
  });

  useEffect(() => {
    setRiders(getRiders());
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddRider = (event) => {
    event.preventDefault();

    const newRider = {
      id: `RID-${String(Date.now()).slice(-4)}`,
      ...formData
    };

    const updatedRiders = [...riders, newRider];
    setRiders(updatedRiders);
    saveRiders(updatedRiders);
    setFormData({ name: '', contact: '', vehicle: '', plateNumber: '' });
  };

  const handleDeleteRider = (id) => {
    const updatedRiders = riders.filter((rider) => rider.id !== id);
    setRiders(updatedRiders);
    saveRiders(updatedRiders);
  };

  return (
    <div className="rider-page">
      <div className="rider-header">
        <h1>Rider Management</h1>
        <p>Manage rider details for order assignment.</p>
      </div>

      <div className="rider-layout">
        <div className="rider-card">
          <h2>Add Rider</h2>
          <form onSubmit={handleAddRider} className="rider-form">
            <label htmlFor="rider-name">Name</label>
            <input id="rider-name" name="name" value={formData.name} onChange={handleChange} required />

            <label htmlFor="rider-contact">Contact</label>
            <input id="rider-contact" name="contact" value={formData.contact} onChange={handleChange} required />

            <label htmlFor="rider-vehicle">Vehicle</label>
            <input id="rider-vehicle" name="vehicle" value={formData.vehicle} onChange={handleChange} required />

            <label htmlFor="rider-plate">Plate Number</label>
            <input id="rider-plate" name="plateNumber" value={formData.plateNumber} onChange={handleChange} required />

            <button type="submit" className="rider-add-btn">Save Rider</button>
          </form>
        </div>

        <div className="rider-card">
          <h2>Riders List</h2>
          <div className="rider-table-wrapper">
            <table className="rider-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Vehicle</th>
                  <th>Plate Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {riders.map((rider) => (
                  <tr key={rider.id}>
                    <td>{rider.name}</td>
                    <td>{rider.contact}</td>
                    <td>{rider.vehicle}</td>
                    <td>{rider.plateNumber}</td>
                    <td>
                      <button type="button" className="rider-delete-btn" onClick={() => handleDeleteRider(rider.id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
                {riders.length === 0 && (
                  <tr>
                    <td colSpan="5" className="rider-empty">No riders saved yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiderManagement;
