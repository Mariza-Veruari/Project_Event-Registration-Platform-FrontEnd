import { Navigate } from 'react-router-dom';
import useSession from '../providers/session';
import React from 'react';

const PrivateRoute = ({ children, admin }) => {
  const { user } = useSession();
  if (user) {
    if (admin) {
      if (user?.role !== 'Admin') return <Navigate to='/' />;
    }
    return children;
  } else {
    return <Navigate to='/login' />;
  }
};

export default PrivateRoute;
