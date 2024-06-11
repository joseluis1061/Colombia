import { Component } from '@angular/core';
import { UserBanerComponent } from '../../components/user-baner/user-baner.component';
@Component({
  selector: 'app-my-user',
  standalone: true,
  imports: [UserBanerComponent],
  templateUrl: './my-user.component.html'
})
export class MyUserComponent {

}
