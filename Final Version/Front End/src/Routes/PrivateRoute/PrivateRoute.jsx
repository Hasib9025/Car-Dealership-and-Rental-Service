import { AuthContext } from '../../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Check if user is logged in from local storage
  const isUserLoggedIn = localStorage.getItem('login') === 'true';

  if (loading) {
    // Display loading spinner while the useEffect is still running
    return <span className="loading loading-spinner text-warning"></span>;
  }

  // Check if there is a user or if the user is logged in from local storage, and render children if true
  if (user || isUserLoggedIn) {
    return children;
  }

  // If no user is found, redirect to the login page
  return <Navigate state={{ from: location }} to="/login" replace />;
};

export default PrivateRoute;
