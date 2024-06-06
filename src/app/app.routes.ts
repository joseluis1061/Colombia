import { Routes } from '@angular/router';
import { adminRoleGuard } from './shared/guards/admin-role.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/webside/webside.module').then(m => m.WebsideModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/administrador/administrador.module').then(m => m.AdministradorModule),
    canActivate: [adminRoleGuard]
  }
];
