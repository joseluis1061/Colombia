import { Component, OnInit, inject } from '@angular/core';
import { StarRatingComponent} from '../../../../shared/components/star-rating-component/star-rating-component.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-user-baner',
  standalone: true,
  imports: [StarRatingComponent, FontAwesomeModule],
  templateUrl: './user-baner.component.html'
})
export class UserBanerComponent implements OnInit{
  faPencil=faPencil;

  private authService = inject(AuthService);
  currentUser = this.authService.currentUser;
  ngOnInit(): void {
    //this.authService.currentUser()
  }





}
