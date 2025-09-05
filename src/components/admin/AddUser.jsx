import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { validateName, validateAddress, validateEmail, validatePassword } from '../../utils/validators';
import { USER_ROLES } from '../../utils/constants';

const AddUser = () => {
  const { addUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    role: USER_ROLES.USER
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
    
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    const result = addUser(formData);
    
    if (result.success) {
      setSuccessMessage('User added successfully');
      setFormData({ 
        name: '', 
        email: '', 
        address: '', 
        password: '', 
        role: USER_ROLES.USER 
      });
      setErrors({});
    } else {
      setErrors({ general: result.error });
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Add New User</h2>
      </div>
      
      <div style={{ padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name (min 20 chars)</label>
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
          
          <div className="form-group">
            <label className="form-label">Password (8-16 chars, uppercase & special char)</label>
            <input
              type="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Role</label>
            <select
              name="role"
              className="form-input"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value={USER_ROLES.USER}>Normal User</option>
              <option value={USER_ROLES.ADMIN}>System Administrator</option>
              <option value={USER_ROLES.OWNER}>Store Owner</option>
            </select>
          </div>
          
          {errors.general && <div className="error" style={{ marginBottom: '15px' }}>{errors.general}</div>}
          {successMessage && <div style={{ color: 'green', marginBottom: '15px' }}>{successMessage}</div>}
          
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Adding User...' : 'Add User'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;