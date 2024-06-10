import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { UsersComponent } from './pages/users/users.component';
import { MyUserComponent } from './pages/my-user/my-user.component';
import { BoardComponent } from './pages/board/board.component';
const routes: Routes = [
  {
    path:'',
    component: LayoutComponent,
    children:[
      {
        path: '',
        redirectTo: '/admin/myUser',
        pathMatch: 'full'
      },
      {
        path: 'myUser',
        component: MyUserComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
