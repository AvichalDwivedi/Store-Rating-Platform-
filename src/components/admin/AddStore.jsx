import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { validateName, validateAddress, validateEmail } from '../../utils/validators';

const AddStore = () => {
  const { addStore } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;
    
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    const addressError = validateAddress(formData.address);
    if (addressError) newErrors.address = addressError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    const result = addStore(formData);
    
    if (result.success) {
      setSuccessMessage('Store added successfully');
      setFormData({ name: '', email: '', address: '' });
      setErrors({});
    } else {
      setErrors({ general: result.error });
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Add New Store</h2>
      </div>
      
      <div style={{ padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Store Name (min 20 chars)</label>
            <input
              type="text"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Address (max 400 chars)</label>
            <textarea
              name="address"
              className="form-input"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              required
            />
            {errors.address && <div className="error">{errors.address}</div>}
          </div>
          
          {errors.general && <div className="error" style={{ marginBottom: '15px' }}>{errors.general}</div>}
          {successMessage && <div style={{ color: 'green', marginBottom: '15px' }}>{successMessage}</div>}
          
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Adding Store...' : 'Add Store'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStore;