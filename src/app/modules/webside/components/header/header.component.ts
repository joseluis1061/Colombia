import { Component, OnInit, inject, signal, Inject, PLATFORM_ID, AfterViewInit, afterNextRender } from '@angular/core'; //afterNextRender
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
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
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';


import { Dialog } from '@angular/cdk/dialog';
import { LoginComponent } from '../login/login.component';

import { AuthService } from '../../../../services/auth.service';
import { OverlayModule } from '@angular/cdk/overlay';

import { FirestoreService } from '../../../../services/firestore.service';

import { Route } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, RouterLinkWithHref, RouterModule, OverlayModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, AfterViewInit{
  private firestoreService = inject(FirestoreService);
  private authService = inject(AuthService);
  currentUser = this.authService.currentUser;
  userCurrent = signal<any | null>(null);
  userRole = signal<string>('user');

  openUserOptions: boolean = false;
  faCoffee = faCoffee;
  faHome = faHome;
  faTable = faTable;
  faTableList = faTableList;
  faUser = faUser;
  faBars = faBars;
  faCartShopping = faCartShopping;
  isBrowser!: boolean;

  constructor(
    private dialog: Dialog,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ){
    this.isBrowser = isPlatformBrowser(platformId);

    afterNextRender(() => {
      // Safe to check `scrollHeight` because this will only run in the browser, not the server.
      this.isAutenticated();
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

  isAutenticated(): void{
    if(this.isBrowser){
      console.log("Browser sessionStorage");
      this.authService.isAuthenticated().subscribe({
        next: (userCurrent) => {
          if(userCurrent){
            this.userCurrent.set(userCurrent);
            const currentUser = this.firestoreService.getUser(userCurrent.uid).subscribe(
              response => {
                this.userRole.set(response.role || "user");
                sessionStorage.setItem('user', JSON.stringify(response || {}));
                //this.authService.setCurrentUser(response)
              }
            )
          }else if(sessionStorage.getItem('user') !== undefined){
            sessionStorage.removeItem('user')
          }
        }
      })
    }
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
    this.authService.logout();
    location.reload();
  }
}
