import { useContext } from 'react';
import { Navigate } from 'react-router';
import { UserContext } from '../context/UserContext';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (user === null) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
