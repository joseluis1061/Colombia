import { Component, OnInit, inject, signal } from '@angular/core';
import { PlaceColombiaService } from '../../../../services/place-colombia.service';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { Regions, RegionDeparments, Department } from '../../../../models/colombian.models';
@Component({
  selector: 'app-menu-places',
  standalone: true,
  imports: [OverlayModule, HttpClientModule],
  templateUrl: './menu-places.component.html'
})
export class MenuPlacesComponent implements OnInit{
  isOpenRegion = false;
  isOpenDepartment = false;
  regions = signal<Regions[] | null>(null);
  RegionDeparments = signal<RegionDeparments[] | null>(null);
  deparments = signal<Department[] | null>(null)

  private placeColombia = inject(PlaceColombiaService);


  ngOnInit(): void {
    this.placeColombia.getRegions().subscribe({
      next: (regions) => {
        this.regions.set(regions);
      }
    })
  }

  selectRegionId(id: number){
    this.placeColombia.getRegionsById(id.toString()).subscribe({
      next: (response) => {
        console.log(response)
      }
    })
  }

  selectRegionIdDepartments(id: number){
    this.placeColombia.getRegionsByIdDepartments(id.toString()).subscribe({
      next: (response:Department[]) => {
        this.deparments.set(response);
        this.isOpenRegion = false;
        console.log(this.deparments())
      }
    })
  }

}
