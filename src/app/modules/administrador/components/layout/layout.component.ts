import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  faBell = faBell;

}
