import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../services/firestore.service';
import { IDataUser } from '../../../../models/user.model';
import { MenuPlacesComponent } from "../../../webside/components/menu-places/menu-places.component";
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MenuPlacesComponent
],
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {

  private firestoreService: FirestoreService = inject(FirestoreService);
  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);
  users: IDataUser[] = [];

  constructor(){}


  ngOnInit(): void {
    this.firestoreService.getCollectionChanges<IDataUser>("users").subscribe(
      response => {
        this.users = response;
        this.cd.markForCheck();
      }
    )
  }

}
