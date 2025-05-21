import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import Layout from "../layout/Layout.jsx";
import ClientPage from "../pages/ClientPage.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import CreateRepairPage from "../pages/CreateRepairPage.jsx";
import WorkerLayout from "../layout/WorkerLayout.jsx";
import CreateClientPage from "../pages/CreateClientPage.jsx";
import WorkerPage from "../pages/WorkerPage.jsx"; 
import CreateVehiclePage from "../pages/CreateVehiclePage.jsx";
import EditRepairPage from '../pages/EditRepairPage.jsx';
import AdminLayout from '../layout/AdminLayout';
import UsersPage from '../pages/UsersPage.jsx';
import ConditionalLayout from '../components/ConditionalLayout';
import VehiclesPage from '../pages/VehiclesPage.jsx';
import CreateUserPage from '../pages/CreateUserPage.jsx';

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
          <ProtectedRoute allowedRoles={['worker', 'admin']}>
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
              <ConditionalLayout title="Reparaciones">
                <WorkerPage />
              </ConditionalLayout>
            ),
          },
          {
            path: 'create-client',
            element: (
              <ConditionalLayout title="Registrar Nuevo Cliente">
                <CreateClientPage />
              </ConditionalLayout>
            ),
          },
          {
            path: 'create-repair',
            element: (
              <ConditionalLayout title="Crear Reparación">
                <CreateRepairPage />
              </ConditionalLayout>
            ),
          },
          {
            path: 'create-vehicle',
            element: (
              <ConditionalLayout title="Crear Vehículo">
                <CreateVehiclePage />
              </ConditionalLayout>
            ),
          },
          {
            path: 'repair/:repairId/edit',
            element: (
              <ConditionalLayout title="Editar Reparación">
                <EditRepairPage />
              </ConditionalLayout>
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
            element: <Navigate to="users" replace />,
          },
          {
            path: 'users',
            element: (
              <AdminLayout title="Usuarios">
                <UsersPage />
              </AdminLayout>
            ),
          },
          {
            path: 'create-user',
            element: (
              <AdminLayout title="Crear Usuario">
                <CreateUserPage />
              </AdminLayout>
            ),
          },
          {
            path: 'repairs',
            element: (
              <AdminLayout title="Reparaciones">
                <WorkerPage />
              </AdminLayout>
            ),
          },
          {
            path: 'vehicles',
            element: (
              <AdminLayout title="Vehículos">
                <VehiclesPage />
              </AdminLayout>
            ),
          },
          {
            path: 'create-vehicle',
            element: (
              <AdminLayout title="Crear Vehículo">
                <CreateVehiclePage />
              </AdminLayout>
            ),
          },
          // {
          //   path: 'vehicle/:vehicleId/edit',
          //   element: (
          //     <AdminLayout title="Editar Vehículo">
          //       <EditVehiclePage />
          //     </AdminLayout>
          //   ),
          // }
        ],
      },
      {
        path: '*',
        element: <Navigate to="/login" replace />,
      },
    ],
  },
]);
