import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHotel } from '@fortawesome/free-solid-svg-icons'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import { faRoute } from '@fortawesome/free-solid-svg-icons'
import { faPersonWalkingLuggage } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule],
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

 /*
 <i class="fa-solid fa-star"></i>
 <i class="fa-solid fa-hotel"></i>
 <i class="fa-solid fa-utensils"></i>
 <i class="fa-solid fa-plane"></i>
 <i class="fa-solid fa-route"></i>
 <i class="fa-solid fa-person-walking-luggage"></i>
 <i class="fa-solid fa-location-dot"></i>
 */
}
