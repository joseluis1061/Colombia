import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogModule } from '@angular/cdk/dialog';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';

interface OutputData {
  rta: Boolean;
}

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './registerUser.component.html',
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterUserComponent {
  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private dialogRef: DialogRef<OutputData>,
  ) {}


  ngOnInit(): void { }

  // Inicializa campos y define validaciones de formulario
  initFormParent(): void {
    this.reservationForm = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  onSubmitLogin(){
    console.log(this.reservationForm.value);
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

  closeWithRta(rta: boolean) {
    this.dialogRef.close({ rta });
  }
}
