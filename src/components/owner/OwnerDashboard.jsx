import { useAuth } from '../../hooks/useAuth';
import { USER_ROLES } from '../../utils/constants';

const OwnerDashboard = () => {
  const { user, stores, ratings, users } = useAuth();

  const ownerStores = stores.filter(store => store.ownerId === user.id);
  
  const getStoreRatings = (storeId) => {
    return ratings.filter(rating => rating.storeId === storeId);
  };
  
  const getAverageRating = (storeId) => {
    const storeRatings = getStoreRatings(storeId);
    if (storeRatings.length === 0) return 0;
    
    const total = storeRatings.reduce((sum, r) => sum + r.rating, 0);
    return (total / storeRatings.length).toFixed(1);
  };
  
  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Store Owner Dashboard</h2>
      
      {ownerStores.map(store => {
        const storeRatings = getStoreRatings(store.id);
        const averageRating = getAverageRating(store.id);
        
        return (
          <div key={store.id} className="card" style={{ marginBottom: '30px' }}>
            <div className="card-header">
              <h3 className="card-title">{store.name}</h3>
              <div>Average Rating: {averageRating} ★</div>
            </div>
            
            <div style={{ padding: '20px' }}>
              <h4 style={{ marginBottom: '15px' }}>Ratings Received</h4>
              
              {storeRatings.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Rating</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {storeRatings.map(rating => (
                      <tr key={rating.id}>
                        <td>{getUserName(rating.userId)}</td>
                        <td>{rating.rating} ★</td>
                        <td>{new Date(rating.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No ratings received yet.</p>
              )}
            </div>
          </div>
        );
      })}
      
      {ownerStores.length === 0 && (
        <div className="card">
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h3>No Stores Found</h3>
            <p>You haven't been assigned any stores yet.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;