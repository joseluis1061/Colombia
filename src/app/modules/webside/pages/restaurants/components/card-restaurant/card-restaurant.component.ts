import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-restaurant',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>card-restaurant works!</p>`,
  styleUrl: './card-restaurant.component.css',
})
export class CardRestaurantComponent { }
