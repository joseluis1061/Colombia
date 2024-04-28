import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { faTableList } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  faCoffee = faCoffee;
  faHome = faHome;
  faTable = faTable;
  faTableList = faTableList;
  faUser = faUser;
  faBars = faBars;

  constructor(
    private router: Router
  ){}


}
