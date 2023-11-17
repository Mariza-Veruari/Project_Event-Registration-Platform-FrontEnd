import { Navigate } from 'react-router-dom';
import useSession from '../providers/session';
import React from 'react';


const PublicRoute = ({ children }) => {
  const { user } = useSession();
  if (!user) {
    return children;
  } else {
    return <Navigate to='/' />;
  }
};

export default PublicRoute;
