import { Component } from '@angular/core';
import { MenuPlacesComponent } from '../../components/menu-places/menu-places.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuPlacesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


}
