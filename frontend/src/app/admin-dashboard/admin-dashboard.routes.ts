import { Routes } from '@angular/router';
import { AdminDashboardLayout } from './layouts/admin-dashboard-layout/admin-dashboard-layout';
import { ReportsAdminPage } from './pages/reports-admin-page/reports-admin-page';
import { ReportAdminPage } from './pages/report-admin-page/report-admin-page';

export const adminDashboardRoutes: Routes = [
  {
    path: '',
    component: AdminDashboardLayout,
    children: [
      {
        path: 'reports',
        component: ReportsAdminPage,
      },
      {
        path: 'report/:id',
        component: ReportAdminPage,
      },
      {
        path: '**',
        redirectTo: 'reports',
      },
    ],
  },
];

export default adminDashboardRoutes;
