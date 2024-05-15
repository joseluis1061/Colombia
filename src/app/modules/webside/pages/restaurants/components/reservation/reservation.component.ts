import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRef, Dialog, DIALOG_DATA, DialogModule } from '@angular/cdk/dialog';

interface InputData {
  name: string;
}
interface OutputData {
  rta: Boolean;
}

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    CommonModule, DialogModule
  ],
  templateUrl: './reservation.component.html',
  styles:`
  :host {
    display: block;
    background: #fff;
    border-radius: 8px;
    padding: 8px 16px;
  }
  `
})
export class ReservationComponent {
  name: string = '';
  constructor(
    private dialogRef: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) data: InputData
  ) {
    this.name = data.name;
  }

  close() {
    this.dialogRef.close();
  }

  closeWithRta(rta: boolean) {
    this.dialogRef.close({ rta });
  }
}
