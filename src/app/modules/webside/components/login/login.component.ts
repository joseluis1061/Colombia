import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { DialogModule } from '@angular/cdk/dialog';
import { DialogRef, Dialog, DIALOG_DATA } from '@angular/cdk/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { RegisterUserComponent } from '../registerUser/registerUser.component';
import { AuthService } from '../../../../services/auth.service';

interface OutputData {
  rta: Boolean;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, DialogModule, ReactiveFormsModule ],
  templateUrl: './login.component.html',
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
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  authService = inject(AuthService);

  constructor(
    private dialogRef: DialogRef<OutputData>,
    private dialog: Dialog,
  ) {}

  ngOnInit(): void {
    this.initFormParent();
  }

  // Inicializa campos y define validaciones de formulario
  initFormParent(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  onSubmitLogin(){
    this.authService.signInUser(this.loginForm.value.email, this.loginForm.value.password);
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

  closeWithRta(rta: boolean) {
    this.dialogRef.close({ rta });
  }

  openRegisterDialog() {
    this.close();
    const dialogRef = this.dialog.open(RegisterUserComponent, {
      minWidth: '300px',
      maxWidth : '50%',
      disableClose: true,
      autoFocus: false,
    });
    dialogRef.closed.subscribe(output => {
      console.log("Register Output: ", output);
    })
  }

}
