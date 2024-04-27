import { Component, OnInit, inject } from '@angular/core';
import {CdkMenuModule} from '@angular/cdk/menu';
import { PlaceColombiaService } from '../../../../services/place-colombia.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-menu-places',
  standalone: true,
  imports: [CdkMenuModule, HttpClientModule],
  templateUrl: './menu-places.component.html'
})
export class MenuPlacesComponent implements OnInit{
  private placeColombia = inject(PlaceColombiaService);


  ngOnInit(): void {
    this.placeColombia.getRegions().subscribe({
      next: (regions) => {
        console.log("Regiones", regions);
      }
    })
  }

}
