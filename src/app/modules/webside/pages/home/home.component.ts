import { Component, inject } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHotel } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import { faPersonWalkingLuggage } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, RouterLinkWithHref],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  faHotel = faHotel;
  faUtensils = faUtensils;
  faPlane = faPlane;
  faRoute = faRoute;
  faPersonWalkingLuggage = faPersonWalkingLuggage;
  faLocationDot = faLocationDot;
}
