import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardFoodComponent } from '../card-food/card-food.component';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StarRatingComponentComponent } from '../../../../../../shared/components/star-rating-component/star-rating-component.component';
import { UsersService } from '../../../../../../services/users.service';
import { RootObject, UserModel } from '../../../../../../models/user.model';
// import { StarRatingConfigService } from 'angular-star-rating';
// import { StarRatingModule } from 'angular-star-rating';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [CommonModule, CardFoodComponent, FontAwesomeModule, StarRatingComponentComponent], //, StarRatingModule
  templateUrl: './restaurant.component.html',
  // providers: [StarRatingConfigService]
})
export class RestaurantComponent {
  faLocationDot = faLocationDot;
  myRating = 0;

  usersService = inject(UsersService);
  user:UserModel| null = null;
  users= signal<UserModel[]>([]);

  ngOnInit(): void {
    for (let index = 0; index < 10; index++) {
      this.getUsers();
    }
  }

  getUsers(){
    this.usersService.getUser().subscribe(
      (result:UserModel) => {
        this.users?.update(preview => [...preview, result])
      }
    )
  }


  onRatingChange(rating: number) {
    this.myRating = rating;
    console.log(`La nueva calificación es ${rating}`);
  }

}
