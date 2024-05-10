import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { HistoryComponent } from './pages/history/history.component';

import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { RestaurantComponent } from './pages/restaurants/components/restaurant/restaurant.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'history',
        component: HistoryComponent
      },
      {
        path: 'admin',
        loadChildren: () => import('../administrador/administrador.module').then(m => m.AdministradorModule)
      },
      {
        path: 'restautants',
        component: RestaurantsComponent
      },
      {
        path: 'restautant',
        component: RestaurantComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsideRoutingModule { }
