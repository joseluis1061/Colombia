import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './restaurant.component.html',
})
export class RestaurantComponent {
  ngOnInit(): void { }

}
