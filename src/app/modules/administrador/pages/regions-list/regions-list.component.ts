import { Component, inject, OnInit } from '@angular/core';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { FormCreateRegionComponent } from './components/form-create-region/form-create-region.component';
import { FirestoreService } from '../../../../services/firestore.service';
import { FirebaseStorageService } from '../../../../services/firebase-storage.service';
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
  private firebaseStorageService= inject(FirebaseStorageService);

  regions: IRegion[] = [];

  ngOnInit(): void {
    this.firestoreService.getCollectionChanges<IRegion>("Regions").subscribe({
      next: res => {
        this.regions = res;
        console.log("ALL REGIONS: ", this.regions);
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

  async onDelete(region: IRegion, id:string){
    console.log("DELETE REGION: ", region)
    console.log("DELETE ID: ", id)
    if(confirm("Estas seguro de eliminar la región "+region.name.toUpperCase())) {
      this.firestoreService.deleteDocumentID(`Regions`, `${region.id}`);
      this.firebaseStorageService.deleteFile(`Regions/${region.id}`);
    }
  }
}
