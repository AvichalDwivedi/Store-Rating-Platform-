import { useState, useMemo } from 'react';
import { useAuth } from '../../hooks/useAuth';
import RatingForm from './RatingForm';

const StoreList = () => {
  const { stores, ratings } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStores = useMemo(() => {
    return stores.filter(store => {
      return (
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [stores, searchTerm]);

  const getStoreRating = (storeId) => {
    const storeRatings = ratings.filter(r => r.storeId === storeId);
    if (storeRatings.length === 0) return 0;
    
    const total = storeRatings.reduce((sum, r) => sum + r.rating, 0);
    return (total / storeRatings.length).toFixed(1);
  };

  const getUserRating = (storeId) => {
    const userRating = ratings.find(r => r.storeId === storeId);
    return userRating ? userRating.rating : null;
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Stores List</h2>
      </div>
      
      <div style={{ padding: '20px' }}>
        <div className="form-group">
          <label className="form-label">Search Stores</label>
          <input
            type="text"
            className="form-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or address"
          />
        </div>
        
        {filteredStores.map(store => {
          const overallRating = getStoreRating(store.id);
          const userRating = getUserRating(store.id);
          
          return (
            <div key={store.id} className="store-card">
              <div className="store-header">
                <h3 className="store-name">{store.name}</h3>
                <div className="store-rating">
                  Overall Rating: {overallRating} ★
                </div>
              </div>
              
              <div className="store-address">
                <strong>Address:</strong> {store.address}
              </div>
              
              {userRating && (
                <div style={{ marginBottom: '15px' }}>
                  Your Rating: {userRating} ★
                </div>
              )}
              
              <RatingForm storeId={store.id} userRating={userRating} />
            </div>
          );
        })}
        
        {filteredStores.length === 0 && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            No stores found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreList;