import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardFoodComponent } from '../card-food/card-food.component';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StarRatingComponentComponent } from '../../../../../../shared/components/star-rating-component/star-rating-component.component';
import { UsersService } from '../../../../../../services/users.service';
import { RootObject, UserModel } from '../../../../../../models/user.model';

import { ReservationComponent } from '../reservation/reservation.component';
import { Dialog, DialogModule } from '@angular/cdk/dialog';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [CommonModule, CardFoodComponent, FontAwesomeModule, StarRatingComponentComponent, DialogModule],
  templateUrl: './restaurant.component.html',
  // providers: [StarRatingConfigService]
})
export class RestaurantComponent {
  faLocationDot = faLocationDot;
  myRating = 0;

  usersService = inject(UsersService);
  user:UserModel| null = null;
  users= signal<UserModel[]>([]);

  constructor(
    private dialog: Dialog,
  ) { }

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

  openDialog(name: string) {
    const dialogRef = this.dialog.open(ReservationComponent, {
      minWidth: '300px',
      maxWidth : '50%',
      disableClose: true,
      autoFocus: false,
      data: {
        name: name,
      }
    });
    dialogRef.closed.subscribe(output => {
      console.log(output);
    })
  }

}
