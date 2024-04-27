import { Component } from '@angular/core';
import {CdkMenuModule} from '@angular/cdk/menu';
@Component({
  selector: 'app-menu-places',
  standalone: true,
  imports: [CdkMenuModule],
  templateUrl: './menu-places.component.html'
})
export class MenuPlacesComponent {

}
