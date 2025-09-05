import { useState, useMemo } from 'react';
import { useAuth } from '../../hooks/useAuth';

const StoresList = () => {
  const { stores, ratings, users } = useAuth();
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    address: ''
  });

  const filteredStores = useMemo(() => {
    return stores.filter(store => {
      return (
        store.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        store.email.toLowerCase().includes(filters.email.toLowerCase()) &&
        store.address.toLowerCase().includes(filters.address.toLowerCase())
      );
    });
  }, [stores, filters]);

  const getStoreRating = (storeId) => {
    const storeRatings = ratings.filter(r => r.storeId === storeId);
    if (storeRatings.length === 0) return 0;
    
    const total = storeRatings.reduce((sum, r) => sum + r.rating, 0);
    return (total / storeRatings.length).toFixed(1);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Stores List</h2>
      </div>
      
      <div style={{ padding: '20px' }}>
        <div className="filters">
          <div className="filter-item">
            <label className="form-label">Filter by Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              value={filters.name}
              onChange={handleFilterChange}
              placeholder="Search by name"
            />
          </div>
          
          <div className="filter-item">
            <label className="form-label">Filter by Email</label>
            <input
              type="text"
              name="email"
              className="form-input"
              value={filters.email}
              onChange={handleFilterChange}
              placeholder="Search by email"
            />
          </div>
          
          <div className="filter-item">
            <label className="form-label">Filter by Address</label>
            <input
              type="text"
              name="address"
              className="form-input"
              value={filters.address}
              onChange={handleFilterChange}
              placeholder="Search by address"
            />
          </div>
        </div>
        
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Rating</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {filteredStores.map(store => {
              const owner = users.find(u => u.id === store.ownerId);
              return (
                <tr key={store.id}>
                  <td>{store.name}</td>
                  <td>{store.email}</td>
                  <td>{store.address}</td>
                  <td>
                    <div className="rating-stars">
                      {getStoreRating(store.id)} ★
                    </div>
                  </td>
                  <td>{owner ? owner.name : 'Unknown'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {filteredStores.length === 0 && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            No stores found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default StoresList;