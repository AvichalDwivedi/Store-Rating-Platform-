import { useContext, createContext } from 'react';
import { useLocalStorage } from './useLocalStorage';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const [users, setUsers] = useLocalStorage('users', [
    {
      id: 1,
      name: 'System Administrator',
      email: 'admin@example.com',
      password: 'Admin@123',
      address: '123 Admin Street, Admin City',
      role: 'System Administrator'
    }
  ]);
  const [stores, setStores] = useLocalStorage('stores', []);
  const [ratings, setRatings] = useLocalStorage('ratings', []);

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      return { success: true, user: foundUser };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const register = (userData) => {
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, error: 'User with this email already exists' };
    }
    
    const newUser = {
      id: Date.now(),
      ...userData,
      role: 'Normal User'
    };
    
    setUsers([...users, newUser]);
    return { success: true, user: newUser };
  };

  const addUser = (userData) => {
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, error: 'User with this email already exists' };
    }
    
    const newUser = {
      id: Date.now(),
      ...userData
    };
    
    setUsers([...users, newUser]);
    return { success: true, user: newUser };
  };

  const addStore = (storeData) => {
    const existingStore = stores.find(s => s.email === storeData.email);
    if (existingStore) {
      return { success: false, error: 'Store with this email already exists' };
    }
    
    const newStore = {
      id: Date.now(),
      ...storeData,
      ownerId: user.id
    };
    
    setStores([...stores, newStore]);
    return { success: true, store: newStore };
  };

  const submitRating = (storeId, ratingValue) => {
    const existingRating = ratings.find(r => r.storeId === storeId && r.userId === user.id);
    
    if (existingRating) {
      const updatedRatings = ratings.map(r => 
        r.id === existingRating.id ? { ...r, rating: ratingValue } : r
      );
      setRatings(updatedRatings);
    } else {
      const newRating = {
        id: Date.now(),
        storeId,
        userId: user.id,
        rating: ratingValue,
        date: new Date().toISOString()
      };
      setRatings([...ratings, newRating]);
    }
    
    return { success: true };
  };

  const updatePassword = (userId, newPassword) => {
    const updatedUsers = users.map(u => 
      u.id === userId ? { ...u, password: newPassword } : u
    );
    setUsers(updatedUsers);
    
    if (user.id === userId) {
      setUser({ ...user, password: newPassword });
    }
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    users,
    stores,
    ratings,
    login,
    register,
    addUser,
    addStore,
    submitRating,
    updatePassword,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};