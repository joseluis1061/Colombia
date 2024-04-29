import { Component, OnInit, inject, signal } from '@angular/core';
import { MenuPlacesComponent } from '../../components/menu-places/menu-places.component';
import { PlaceColombiaService } from '../../../../services/place-colombia.service';
import { Regions } from '../../../../models/colombian.models';
import { CardRegionComponent } from './components/card-region/card-region.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuPlacesComponent, CardRegionComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  regions = signal<Regions[] | null>(null)

  private placesColombianService = inject(PlaceColombiaService);

  ngOnInit(): void{
    this.placesColombianService.getRegions().subscribe({
      next: (regions) => {
        this.regions.set(regions)
        console.log(regions)
      }
    })
  }

}
