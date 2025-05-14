import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import Layout from "../layout/Layout.jsx";
import ClientPage from "../pages/ClientPage.jsx";
import WorkerPage from "../pages/WorkerPage.jsx";
import AdminPage from "../pages/AdminPage.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import CreateClientPage from "../pages/CreateClientPage.jsx";
import CreateRepairPage from "../pages/CreateRepairPage.jsx";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'client',
        element: (
          <ProtectedRoute allowedRoles={['client']}>
            <ClientPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'worker',
        element: (
          <ProtectedRoute allowedRoles={['worker']}>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <WorkerPage />,
          },
          {
            path: 'crear-cliente',
            element: <CreateClientPage />,
          },
          {
            path: 'crear-reparacion',
            element: <CreateRepairPage />,
          },
        ],
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <AdminPage />,
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to="/login" replace />,
      },
    ],
  },
]);
