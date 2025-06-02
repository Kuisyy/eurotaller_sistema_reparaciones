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
import EditUserPage from '../pages/EditUserPage.jsx';
import EditVehiclePage from '../pages/EditVehiclePage.jsx';
import PageTransition from '../components/PageTransition';

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
        element: (
          <PageTransition>
            <LoginPage />
          </PageTransition>
        ),
      },
      {
        path: 'client',
        element: (
          <ProtectedRoute allowedRoles={['client']}>
            <PageTransition>
              <ClientPage />
            </PageTransition>
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
          {
            path: 'vehicles',
            element: (
              <ConditionalLayout title="Vehículos">
                <VehiclesPage />
              </ConditionalLayout>
            ),
          },
          {
            path: 'vehicles/:vehicleId/edit',
            element: (
              <ConditionalLayout title="Editar Vehículo">
                <EditVehiclePage />
              </ConditionalLayout>
            ),
          }
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
                <PageTransition>
                  <UsersPage />
                </PageTransition>
              </AdminLayout>
            ),
          },
          {
            path: 'create-user',
            element: (
              <AdminLayout title="Crear Usuario">
                <PageTransition>
                  <CreateUserPage />
                </PageTransition>
              </AdminLayout>
            ),
          },
          {
            path: 'repairs',
            element: (
              <AdminLayout title="Reparaciones">
                <PageTransition>
                  <WorkerPage />
                </PageTransition>
              </AdminLayout>
            ),
          },
          {
            path: 'create-repair',
            element: (
              <AdminLayout title="Crear Reparación">
                <PageTransition>
                  <CreateRepairPage />
                </PageTransition>
              </AdminLayout>
            ),
          },
          {
            path: 'vehicles',
            element: (
              <AdminLayout title="Vehículos">
                <PageTransition>
                  <VehiclesPage />
                </PageTransition>
              </AdminLayout>
            ),
          },
          {
            path: 'create-vehicle',
            element: (
              <AdminLayout title="Crear Vehículo">
                <PageTransition>
                  <CreateVehiclePage />
                </PageTransition>
              </AdminLayout>
            ),
          },
          {
            path: 'user/:userId/edit',
            element: (
              <AdminLayout title="Editar Usuario">
                <PageTransition>
                  <EditUserPage />
                </PageTransition>
              </AdminLayout>
            ),
          },
          {
            path: 'vehicles/:vehicleId/edit',
            element: (
              <AdminLayout title="Editar Vehículo">
                <PageTransition>
                  <EditVehiclePage />
                </PageTransition>
              </AdminLayout>
            ),
          }
        ],
      },
      {
        path: '*',
        element: <Navigate to="/login" replace />,
      },
    ],
  },
]);
