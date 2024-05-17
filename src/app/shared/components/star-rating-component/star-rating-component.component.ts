import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating-component.component.html'
})
export class StarRatingComponentComponent implements OnInit{
  @Input() averageRating: number = 0;
  @Output() ratingChange = new EventEmitter<number>();

  stars: string[];

  constructor() {
    this.stars = ['&#9734;', '&#9734;', '&#9734;', '&#9734;', '&#9734;'];
  }

  ngOnInit(): void {
    if(this.averageRating !=0){
      for (let index = 0; index < this.averageRating; index++) {
        this.stars[index] = '&#9733;'
      }
    }
  }

  rate(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target || !target.parentNode) {
      return; // Salir de la función si el objetivo o el padre son nulos
    }
    const parent = target.parentNode as HTMLElement;
    const children = Array.from(parent.children);
    const starIndex = children.indexOf(target);
    if (starIndex !== -1) {
      const newRating = starIndex + 1;
      this.setRating(newRating);
    }
  }

  setRating(rating: number) {
    this.averageRating = rating;
    this.ratingChange.emit(this.averageRating);
    this.updateStars();
  }

  updateStars() {
    for (let i = 0; i < 5; i++) {
      this.stars[i] = i < this.averageRating ? '&#9733;' : '&#9734;';
    }
  }
}
