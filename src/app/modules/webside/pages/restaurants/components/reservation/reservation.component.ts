import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRef, DIALOG_DATA, DialogModule } from '@angular/cdk/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';

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
    CommonModule, DialogModule, ReactiveFormsModule
  ],
  templateUrl: './reservation.component.html',
  styles:`
  :host{
    display: block;
    background: #fff;
    border-radius: 8px;
    /* padding: 8px 16px; */
    margin: 0 auto;
    max-height: 100vh;
    width: 90%;
    min-width: 100vw;
    margin: 0 auto;
    right: 0;
    left:0;
    overflow-y: auto;
  }

  ::ng-deep{
    div.cdk-overlay-container > div.cdk-global-overlay-wrapper{
      justify-content: flex-start!important;
    }
  }

  @media (min-width: 768px) {
    :host {
      min-width: unset;
      width: 100%;
    }
    ::ng-deep{
    div.cdk-overlay-container > div.cdk-global-overlay-wrapper{
      justify-content: center!important;
    }
  }
  }
  `
})
export class ReservationComponent implements OnInit{
  namePlace: string = '';

  reservationForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initFormParent();
  }

  // Inicializa campos y define validaciones de formulario
  initFormParent(): void {
    this.reservationForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      idNumber: new FormControl('', Validators.required),
      celPhone: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', Validators.email),
      plan: new FormControl(''),
      date: new FormControl('', Validators.required),
      hour: new FormControl('', Validators.required),
      personsNumber: new FormControl('', Validators.required),
      comments: new FormControl(''),
    });
  }

  constructor(
    private dialogRef: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) data: InputData
  ) {
    this.namePlace = data.name;
  }

  close() {
    this.dialogRef.close();
  }

  closeWithRta(rta: boolean) {
    this.dialogRef.close({ rta });
  }

  onSubmitReservation(){
    console.log(this.reservationForm.value);
    this.close();
  }
}
