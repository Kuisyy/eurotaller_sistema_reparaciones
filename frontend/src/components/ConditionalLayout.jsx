import React from 'react';
import { useAuth } from '../context/AuthContext';
import WorkerLayout from '../layout/WorkerLayout';
import AdminLayout from '../layout/AdminLayout';
import PageTransition from './PageTransition';

const ConditionalLayout = ({ title, children }) => {
  const { user } = useAuth();

  const content = (
    <PageTransition>
      {children}
    </PageTransition>
  );

  if (user?.role === 'admin') {
    return <AdminLayout title={title}>{content}</AdminLayout>;
  }

  return <WorkerLayout title={title}>{content}</WorkerLayout>;
};

export default ConditionalLayout;