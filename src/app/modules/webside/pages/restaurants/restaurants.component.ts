import { Component } from '@angular/core';
import { MenuPlacesComponent } from '../../components/menu-places/menu-places.component';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [MenuPlacesComponent, RouterLinkWithHref],
  templateUrl: './restaurants.component.html'
})
export class RestaurantsComponent {

}
