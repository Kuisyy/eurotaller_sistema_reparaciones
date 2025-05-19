import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import Layout from "../layout/Layout.jsx";
import ClientPage from "../pages/ClientPage.jsx";
import AdminPage from "../pages/AdminPage.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import CreateRepairPage from "../pages/CreateRepairPage.jsx";
import WorkerLayout from "../layout/WorkerLayout.jsx";
import CreateClientPage from "../pages/CreateClientPage.jsx";
import WorkerPage from "../pages/WorkerPage.jsx"; // Añadir esta importación
import CreateVehiclePage from "../pages/CreateVehiclePage.jsx";

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
            element: <Navigate to="repairs" replace />,
          },
          {
            path: 'repairs',
            element: (
              <WorkerLayout title="Reparaciones">
                <WorkerPage />
              </WorkerLayout>
            ),
          },
          {
            path: 'create-client',
            element: (
              <WorkerLayout title="Registrar Nuevo Cliente">
                <CreateClientPage />
              </WorkerLayout>
            ),
          },
          {
            path: 'create-repair',
            element: (
              <WorkerLayout title="Crear Reparación">
                <CreateRepairPage />
              </WorkerLayout>
            ),
          },
          {
            path: 'create-vehicle',
            element: (
              <WorkerLayout title="Crear Vehiculo">
                <CreateVehiclePage />
              </WorkerLayout>
            ),
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
