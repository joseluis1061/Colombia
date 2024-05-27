import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHotel } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import { faPersonWalkingLuggage } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu-simple-service',
  standalone: true,
  imports: [
    CommonModule, RouterLinkWithHref, FontAwesomeModule
  ],
  templateUrl: './menuSimpleService.component.html',
})
export class MenuSimpleServiceComponent {
  faHotel = faHotel;
  faUtensils = faUtensils;
  faPlane = faPlane;
  faRoute = faRoute;
  faPersonWalkingLuggage = faPersonWalkingLuggage;
  faLocationDot = faLocationDot;
}
