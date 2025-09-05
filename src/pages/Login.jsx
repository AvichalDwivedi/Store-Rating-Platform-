import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { validateEmail } from '../utils/validators';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;
    
    if (!password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    const result = login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrors({ general: result.error });
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="container" style={{ maxWidth: '400px', margin: '50px auto' }}>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          
          {errors.general && <div className="error" style={{ marginBottom: '15px' }}>{errors.general}</div>}
          
          <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: '100%' }}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;