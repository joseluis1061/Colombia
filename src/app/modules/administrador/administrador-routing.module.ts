import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { BoardComponent } from './pages/board/board.component';
import { UsersComponent } from './pages/users/users.component';
const routes: Routes = [
  {
    path:'',
    component: LayoutComponent,
    children:[
      {
        path:'users',
        component: UsersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
