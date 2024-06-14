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
    width: 95%;
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

    #cdk-overlay-1{
     max-width:90%;
     border: none
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

    ::ng-deep{
      div.cdk-overlay-pane{
        max-width:70%!important;
        width: 70%!important;
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
      // image: new FormControl(null, [Validators.required])
    });
    this.subscribeRoleChanges();
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

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.registerForm.patchValue({
        image: file
      });
      console.log("IMAGEN FORM: ", file)
    }
  }

  onSubmitRegister(){

    // console.log(this.registerForm.value);
    //const register = this.authService.createUser(this.registerForm);
    console.log("Image Submit: ",this.registerForm.value.image)
    const register = this.authService.register(this.registerForm);
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
