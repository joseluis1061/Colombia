import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHotel } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import { faPersonWalkingLuggage } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import { MenuSimpleServiceComponent } from './components/menuSimpleService/menuSimpleService.component';

import { IHomeServices } from '../../../../models/home.model';
import { FirestoreService } from '../../../../services/firestore.service';
import { IService } from '../../../../models/serrvices.model';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, RouterLinkWithHref, MenuSimpleServiceComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit{
  private firestoreService: FirestoreService = inject(FirestoreService);
  item!: IHomeServices;

  faHotel = faHotel;
  faUtensils = faUtensils;
  faPlane = faPlane;
  faRoute = faRoute;
  faPersonWalkingLuggage = faPersonWalkingLuggage;
  faLocationDot = faLocationDot;

  services: IHomeServices[] = [];
  imgPrincipal: string= "";

  ngOnInit(): void {
    this.firestoreService.getCollectionChanges<IHomeServices>("HomeServicios").subscribe(
      (response) => {
        this.services = response;
        console.log("servicios", this.services);
        this.imgPrincipal = this.services[0].url_img;
        this.item = this.services[0];
      }
    );
  }

  ngAfterViewInit(): void {
    console.log("thumbnailBorderDom: ")
  }

  prevArrow(){
    const element = this.services.splice(this.services.length -1, 1);
    this.services.unshift(element[0]);
  }

  nextArrow(){
    const element = this.services.splice(0,1);
    this.services.push(element[0]);
  }




}
