import { useState, useMemo } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { USER_ROLES } from '../../utils/constants';

const UsersList = () => {
  const { users, stores, ratings } = useAuth();
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    address: '',
    role: ''
  });

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      return (
        user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
        user.address.toLowerCase().includes(filters.address.toLowerCase()) &&
        (filters.role === '' || user.role === filters.role)
      );
    });
  }, [users, filters]);

  const getUserRating = (userId) => {
    if (users.find(u => u.id === userId)?.role !== USER_ROLES.OWNER) return null;
    
    const userStores = stores.filter(s => s.ownerId === userId);
    if (userStores.length === 0) return 0;
    
    let totalRating = 0;
    let totalStores = 0;
    
    userStores.forEach(store => {
      const storeRatings = ratings.filter(r => r.storeId === store.id);
      if (storeRatings.length > 0) {
        const storeTotal = storeRatings.reduce((sum, r) => sum + r.rating, 0);
        totalRating += storeTotal / storeRatings.length;
        totalStores++;
      }
    });
    
    return totalStores > 0 ? (totalRating / totalStores).toFixed(1) : 0;
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
        <h2 className="card-title">Users List</h2>
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
          
          <div className="filter-item">
            <label className="form-label">Filter by Role</label>
            <select
              name="role"
              className="form-input"
              value={filters.role}
              onChange={handleFilterChange}
            >
              <option value="">All Roles</option>
              <option value={USER_ROLES.ADMIN}>System Administrator</option>
              <option value={USER_ROLES.USER}>Normal User</option>
              <option value={USER_ROLES.OWNER}>Store Owner</option>
            </select>
          </div>
        </div>
        
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Role</th>
              <th>Rating (if Owner)</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => {
              const rating = getUserRating(user.id);
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.role}</td>
                  <td>
                    {rating !== null ? (
                      <div className="rating-stars">
                        {rating} ★
                      </div>
                    ) : 'N/A'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {filteredUsers.length === 0 && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            No users found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;