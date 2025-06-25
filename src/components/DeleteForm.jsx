import React, { useState } from 'react';
import './DeleteForm.css';

const DeleteForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulating form submission (replace with actual API request)
    if (formData.name && formData.phone && formData.email) {
      setMessage('Your account deletion request has been submitted.');
      setFormData({ name: '', phone: '', email: '' }); // Reset form
    } else {
      setMessage('Please fill in all fields.');
    }
  };

  return (
    <div className="containerr">
      <h2>Account Deletion Request</h2>
      <p className="instructionss">Please fill in the details below to request account deletion.</p>

      {message && <p className="messagess">{message}</p>}

      <form onSubmit={handleSubmit} className="delete-formm">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />

        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          required
        />

        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          required
        />

        <button type="submit" className="submit-btnn">Submit Request</button>
      </form>
    </div>
  );
};

export default DeleteForm;