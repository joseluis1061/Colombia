import { Component, OnInit, inject, signal } from '@angular/core';
import { MenuPlacesComponent } from '../../components/menu-places/menu-places.component';
import { PlaceColombiaService } from '../../../../services/place-colombia.service';
import { Colombia, Regions } from '../../../../models/colombian.models';
import { CardRegionComponent } from './components/card-region/card-region.component';

@Component({
  selector: 'app-regions',
  standalone: true,
  imports: [MenuPlacesComponent, CardRegionComponent ],
  templateUrl: './regions.component.html'
})
export class RegionsComponent implements OnInit {
  regions = signal<Regions[] | null>(null)

  private placesColombianService = inject(PlaceColombiaService);
  colombia= this.placesColombianService.colombia;

  ngOnInit(): void{
    this.placesColombianService.colombia;
    this.getRegions();
    console.log("Colombia2: ", this.colombia())
  }

  getRegions(){
    this.placesColombianService.getRegions().subscribe({
      next: (regions) => {
        this.regions.set(regions)
      }
    })
  }
}
