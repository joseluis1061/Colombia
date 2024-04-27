import { Component, OnInit, inject, signal } from '@angular/core';
import { MenuPlacesComponent } from '../../components/menu-places/menu-places.component';
import { PlaceColombiaService } from '../../../../services/place-colombia.service';
import { Regions } from '../../../../models/colombian.models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuPlacesComponent ],
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
      }
    })
  }

}
