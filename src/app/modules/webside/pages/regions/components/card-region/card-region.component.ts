import { Component, Input } from '@angular/core';
import { Regions } from '../../../../../../models/colombian.models';

@Component({
  selector: 'app-card-region',
  standalone: true,
  imports: [],
  templateUrl: './card-region.component.html'
})
export class CardRegionComponent {
  @Input() region!: Regions;

}
