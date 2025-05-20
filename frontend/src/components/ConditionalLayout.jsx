import React from 'react';
import { useAuth } from '../context/AuthContext';
import WorkerLayout from '../layout/WorkerLayout';
import AdminLayout from '../layout/AdminLayout';

const ConditionalLayout = ({ title, children }) => {
  const { user } = useAuth();

  if (user?.role === 'admin') {
    return <AdminLayout title={title}>{children}</AdminLayout>;
  }

  return <WorkerLayout title={title}>{children}</WorkerLayout>;
};

export default ConditionalLayout;