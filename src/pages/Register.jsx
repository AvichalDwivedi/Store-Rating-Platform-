import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { validateName, validateAddress, validateEmail, validatePassword } from '../utils/validators';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

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
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    const { confirmPassword, ...userData } = formData;
    const result = register(userData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrors({ general: result.error });
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="container" style={{ maxWidth: '500px', margin: '50px auto' }}>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Register</h2>
        </div>
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
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
          </div>
          
          {errors.general && <div className="error" style={{ marginBottom: '15px' }}>{errors.general}</div>}
          
          <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: '100%' }}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
        
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;