import { useAuth } from '../hooks/useAuth';
import AdminDashboard from '../components/admin/AdminDashboard';
import UserDashboard from '../components/users/UserDashboard';
import OwnerDashboard from '../components/owner/OwnerDashboard';
import { USER_ROLES } from '../utils/constants';

const Dashboard = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user.role) {
      case USER_ROLES.ADMIN:
        return <AdminDashboard />;
      case USER_ROLES.OWNER:
        return <OwnerDashboard />;
      case USER_ROLES.USER:
      default:
        return <UserDashboard />;
    }
  };

  return (
    <div className="container" style={{ padding: '20px 0' }}>
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;