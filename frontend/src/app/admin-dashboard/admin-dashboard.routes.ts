import { Routes } from '@angular/router';
import { AdminDashboardLayout } from './layouts/admin-dashboard-layout/admin-dashboard-layout';
import { ReportsAdminPage } from './pages/reports-admin-page/reports-admin-page';
import { StatisticsAdminPage } from './pages/statistics-admin-page/statistics-admin-page';
import { UsersAdminPage } from './pages/users-admin-page/users-admin-page';

export const adminDashboardRoutes: Routes = [
  {
    path: '',
    component: AdminDashboardLayout,
    children: [
      {
      path: 'statistics',
      component: StatisticsAdminPage,
      },
      {
        path: 'reports',
        component: ReportsAdminPage,
      },
      {
        path: 'users',
        component: UsersAdminPage,
      },
      {
        path: '**',
        redirectTo: 'statistics',
      },
    ],
  },
];

export default adminDashboardRoutes;
