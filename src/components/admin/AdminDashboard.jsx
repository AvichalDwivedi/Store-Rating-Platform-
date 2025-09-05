import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import AddStore from './AddStore';
import AddUser from './AddUser';
import StoresList from './StoresList';
import UsersList from './UsersList';

const AdminDashboard = () => {
  const { users, stores, ratings } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Admin Dashboard</h2>
            
            <div className="dashboard-stats">
              <div className="stat-card">
                <div className="stat-number">{users.length}</div>
                <div className="stat-label">Total Users</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-number">{stores.length}</div>
                <div className="stat-label">Total Stores</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-number">{ratings.length}</div>
                <div className="stat-label">Total Ratings</div>
              </div>
            </div>
          </div>
        );
      case 'add-store':
        return <AddStore />;
      case 'add-user':
        return <AddUser />;
      case 'stores':
        return <StoresList />;
      case 'users':
        return <UsersList />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button 
          className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`btn ${activeTab === 'add-store' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('add-store')}
        >
          Add Store
        </button>
        <button 
          className={`btn ${activeTab === 'add-user' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('add-user')}
        >
          Add User
        </button>
        <button 
          className={`btn ${activeTab === 'stores' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('stores')}
        >
          View Stores
        </button>
        <button 
          className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('users')}
        >
          View Users
        </button>
      </div>
      
      {renderContent()}
    </div>
  );
};

export default AdminDashboard;