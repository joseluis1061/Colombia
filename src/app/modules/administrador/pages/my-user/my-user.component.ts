import { Component, OnInit, inject } from '@angular/core';
import { UserBanerComponent } from '../../components/user-baner/user-baner.component';
import {CdkTableModule} from '@angular/cdk/table';
import { AuthService } from '../../../../services/auth.service';
import { IUserAuthPartial } from '../../../../models/auth.model';
@Component({
  selector: 'app-my-user',
  standalone: true,
  imports: [UserBanerComponent],
  templateUrl: './my-user.component.html'
})
export class MyUserComponent implements OnInit{
  private authService = inject(AuthService);
  user: IUserAuthPartial | null = null;

  ngOnInit(): void{

  }
}
