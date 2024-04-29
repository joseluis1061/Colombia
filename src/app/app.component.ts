import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlaceColombiaService } from './services/place-colombia.service';
import { Colombia } from './models/colombian.models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'turismo-comunitario';
  private placeColombiaService = inject(PlaceColombiaService);
  colombia = this.placeColombiaService.colombia;
  ngOnInit(): void {
    this.placeColombiaService.getGeneralColombia();
    console.log(this.colombia())
  }
}
