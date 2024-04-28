import { Component, OnInit, inject, signal } from '@angular/core';
import { PlaceColombiaService } from '../../../../services/place-colombia.service';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { Regions } from '../../../../models/colombian.models';
@Component({
  selector: 'app-menu-places',
  standalone: true,
  imports: [OverlayModule, HttpClientModule],
  templateUrl: './menu-places.component.html'
})
export class MenuPlacesComponent implements OnInit{
  isOpen = false;
  regions = signal<Regions[] | null>(null);

  private placeColombia = inject(PlaceColombiaService);


  ngOnInit(): void {
    this.placeColombia.getRegions().subscribe({
      next: (regions) => {
        this.regions.set(regions);
      }
    })
  }

}
