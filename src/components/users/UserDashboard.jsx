import { useState } from 'react';
import StoreList from './StoreList';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('stores');

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>User Dashboard</h2>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          className={`btn ${activeTab === 'stores' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('stores')}
        >
          View Stores
        </button>
      </div>
      
      {activeTab === 'stores' && <StoreList />}
    </div>
  );
};

export default UserDashboard;