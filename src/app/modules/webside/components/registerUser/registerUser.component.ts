import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DialogModule } from '@angular/cdk/dialog';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

interface OutputData {
  rta: Boolean;
}

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule
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
  authService = inject(AuthService);
  registerForm: FormGroup = new FormGroup({});
  typeRoleProvider: boolean = false;

  constructor(
    private dialogRef: DialogRef<OutputData>,
  ) {}


  ngOnInit(): void {
    this.initFormParent();
    this.subscribeRoleChanges();
   }

  // Inicializa campos y define validaciones de formulario
  initFormParent(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(5)]),
      idIdetintification: new FormControl('', [Validators.required, Validators.minLength(8)]),
      role: new FormControl('', [Validators.required]),
      nameService: new FormControl(''),
      typeService: new FormControl(''),
    });
  }

  // Suscribirse a los cambios del campo role
  subscribeRoleChanges(): void {
    this.registerForm.get('role')?.valueChanges.subscribe((roleValue) => {
      const nameServiceControl = this.registerForm.get('nameService');
      const typeServiceControl = this.registerForm.get('typeService');
      if (roleValue === 'provider') {
        console.log('El usuario seleccionó el rol de Proveedor');
        this.typeRoleProvider = true;
        // Añadir validadores
        nameServiceControl?.setValidators([Validators.required]);
        typeServiceControl?.setValidators([Validators.required]);
      }else{
        this.typeRoleProvider = false;
        console.log("El role es usuario");
        // Quitar validadores
        nameServiceControl?.clearValidators();
        typeServiceControl?.clearValidators();
      }
      // Actualizar el estado del control y lanzar la validación
      nameServiceControl?.updateValueAndValidity();
      typeServiceControl?.updateValueAndValidity();
    });
  }

  onSubmitRegister(){

    // console.log(this.registerForm.value);
    const register = this.authService.createUser(this.registerForm)
    console.log("Register: ", register);
    //this.close();
  }

  close() {
    this.dialogRef.close();
  }

  closeWithRta(rta: boolean) {
    this.dialogRef.close({ rta });
  }
}
