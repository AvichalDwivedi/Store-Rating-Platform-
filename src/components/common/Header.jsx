import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { USER_ROLES } from '../../utils/constants';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={{ backgroundColor: '#4a6cf7', color: 'white', padding: '15px 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '24px' }}>Store Rating Platform</h1>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {user ? (
            <>
              <span>Welcome, {user.name} ({USER_ROLES[user.role.split(' ')[0].toUpperCase()]})</span>
              <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
              <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>
              <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
              <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;