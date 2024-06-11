import { Component } from '@angular/core';
import { StarRatingComponent} from '../../../../shared/components/star-rating-component/star-rating-component.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-baner',
  standalone: true,
  imports: [StarRatingComponent, FontAwesomeModule],
  templateUrl: './user-baner.component.html'
})
export class UserBanerComponent {
  faPencil=faPencil;
}
