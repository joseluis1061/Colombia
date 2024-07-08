import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FirestoreService } from '../../../../services/firestore.service';
import { FormEventsComponent } from '../form-events/form-events.component';
import { DialogRef, DIALOG_DATA, DialogModule, Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule, FormEventsComponent, DialogModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit{
  faBell = faBell;
  private dialog: Dialog= inject(Dialog);
  private firestoreService: FirestoreService = inject(FirestoreService);
  ngOnInit(): void {

  }

  openDialogCreateEvent() {
    const dialogRef = this.dialog.open(FormEventsComponent, {
      minWidth: '300px',
      maxWidth : '80%',
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
