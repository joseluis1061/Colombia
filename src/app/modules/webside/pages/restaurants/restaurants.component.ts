import { Component } from '@angular/core';
import { MenuPlacesComponent } from '../../components/menu-places/menu-places.component';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [MenuPlacesComponent],
  templateUrl: './restaurants.component.html'
})
export class RestaurantsComponent {

}
