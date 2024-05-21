import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RouterLinkWithHref } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { faTableList } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { Dialog } from '@angular/cdk/dialog';
import { LoginComponent } from '../login/login.component';

import { AuthService } from '../../../../services/auth.service';
import { OverlayModule } from '@angular/cdk/overlay';

import { Route } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, RouterLinkWithHref, RouterModule, OverlayModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  authService = inject(AuthService);
  userCurrent = signal<any | null>(null);
  openUserOptions: boolean = false;
  faCoffee = faCoffee;
  faHome = faHome;
  faTable = faTable;
  faTableList = faTableList;
  faUser = faUser;
  faBars = faBars;

  constructor(
    private dialog: Dialog,
    private router: Router
  ){}

  ngOnInit(): void {
    this.isAutenticated();

  }

  isAutenticated(){
    this.authService.isAuthenticated().subscribe({
      next: (userCurrent) => {
        if(userCurrent){
          this.userCurrent.set(userCurrent);
        }
      }
    })
  }

  openDialogLogin() {
    const dialogRef = this.dialog.open(LoginComponent, {
      minWidth: '300px',
      maxWidth : '50%',
      disableClose: true,
      autoFocus: false,
      data: {
        // todo: todo,
      }
    });
    dialogRef.closed.subscribe(output => {
      console.log(output);
    })
  }

  logOut(){
    console.log("Salir")

    this.authService.logout();
    location.reload();
  }
}
