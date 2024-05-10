import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardFoodComponent } from '../card-food/card-food.component';
@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [CommonModule, CardFoodComponent],
  templateUrl: './restaurant.component.html',
})
export class RestaurantComponent {
  ngOnInit(): void { }

}
