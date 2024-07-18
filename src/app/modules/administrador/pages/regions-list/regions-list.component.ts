import { Component, inject, OnInit } from '@angular/core';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { FormCreateRegionComponent } from './components/form-create-region/form-create-region.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-regions-list',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './regions-list.component.html'
})
export class RegionsListComponent{
  constructor(private dialog: Dialog){};

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
}
