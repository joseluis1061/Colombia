import { Component, inject, OnInit } from '@angular/core';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { FormCreateRegionComponent } from './components/form-create-region/form-create-region.component';
import { FirestoreService } from '../../../../services/firestore.service';
import { IRegion } from '../../../../models/regions.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-regions-list',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './regions-list.component.html'
})
export class RegionsListComponent implements OnInit{
  constructor(private dialog: Dialog){};
  private firestoreService= inject(FirestoreService);
  regions: IRegion[] = [];

  ngOnInit(): void {
    this.firestoreService.getCollectionChanges<IRegion>("Regions").subscribe({
      next: res => {
        this.regions = res;
      }
    }
    )
  }

  openDialogFormCreate() {
    const dialogRef = this.dialog.open(FormCreateRegionComponent, {
      minWidth: '300px',
      maxWidth : '70%',
      disableClose: true,
      autoFocus: false,
      // data: {
      //   name: name,
      // }
    });
    dialogRef.closed.subscribe(output => {
      console.log(output);
    })
  }

  openDialogFormUpdate(region:IRegion) {
    const dialogRef = this.dialog.open(FormCreateRegionComponent, {
      minWidth: '300px',
      maxWidth : '70%',
      disableClose: true,
      autoFocus: false,
      data: region
    });
    dialogRef.closed.subscribe(output => {
      console.log(output);
    })
  }
}
