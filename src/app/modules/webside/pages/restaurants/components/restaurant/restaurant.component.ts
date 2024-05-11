import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardFoodComponent } from '../card-food/card-food.component';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [CommonModule, CardFoodComponent, FontAwesomeModule],
  templateUrl: './restaurant.component.html',
})
export class RestaurantComponent {
  faLocationDot = faLocationDot;
  ngOnInit(): void { }

}
