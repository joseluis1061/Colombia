import { Component } from '@angular/core';
import { StarRatingComponent} from '../../../../shared/components/star-rating-component/star-rating-component.component';
@Component({
  selector: 'app-my-user',
  standalone: true,
  imports: [StarRatingComponent],
  templateUrl: './my-user.component.html'
})
export class MyUserComponent {

}
