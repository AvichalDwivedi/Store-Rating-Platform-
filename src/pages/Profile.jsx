import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { validatePassword } from '../utils/validators';

const Profile = () => {
  const { user, updatePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (user.password !== currentPassword) {
      newErrors.currentPassword = 'Current password is incorrect';
    }
    
    const passwordError = validatePassword(newPassword);
    if (passwordError) newErrors.newPassword = passwordError;
    
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    const result = updatePassword(user.id, newPassword);
    
    if (result.success) {
      setSuccessMessage('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setErrors({});
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="container" style={{ maxWidth: '500px', margin: '20px auto' }}>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Profile</h2>
        </div>
        
        <div style={{ padding: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ marginBottom: '10px' }}>User Information</h3>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
          
          <div>
            <h3 style={{ marginBottom: '15px' }}>Change Password</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
                {errors.currentPassword && <div className="error">{errors.currentPassword}</div>}
              </div>
              
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                {errors.newPassword && <div className="error">{errors.newPassword}</div>}
              </div>
              
              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
              </div>
              
              {successMessage && <div style={{ color: 'green', marginBottom: '15px' }}>{successMessage}</div>}
              
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;