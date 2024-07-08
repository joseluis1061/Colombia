import { Component, Inject, inject, OnInit } from '@angular/core';
import { DialogRef, DIALOG_DATA, DialogModule } from '@angular/cdk/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { subscribe } from 'diagnostics_channel';
import { Subscriber } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

interface InputData {
  name: string;
}
interface OutputData {
  rta: Boolean;
}


@Component({
  selector: 'app-form-events',
  standalone: true,
  imports: [CommonModule, DialogModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './form-events.component.html',
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
export class FormEventsComponent implements OnInit{

  private authService: AuthService = inject(AuthService);
  formNewEvent: FormGroup = new FormGroup({});
  faImage = faImage;
  currentUser: any;
  newFile: any;
  imgEvent: string = '';

  constructor(
    private dialogRef: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) data: InputData
  ) {
    // this.namePlace = data.name;
  }

  ngOnInit(): void {
    this.currenUserState();

  }

  currenUserState(){
    this.authService.currentUserState$.subscribe({
      next: (res)=> {
        this.currentUser = res;
        console.log("currentUser Eventos", this.currentUser);
        this.initFormParent();
      }
    });
  }

  initFormParent(): void {
    this.formNewEvent = new FormGroup({
      uid: new FormControl(this.currentUser.uid.toString),
      title: new FormControl('', Validators.required),
      legend: new FormControl('', Validators.required),
      type: new FormControl('events'),
      email: new FormControl('', Validators.required),
      date_init: new FormControl('', Validators.required),
      date_end: new FormControl('', Validators.required),
      url_img: new FormControl('', Validators.required),
    });
  }

  close(){
    this.dialogRef.close();
  }

  async upLoadImage(event: any){
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // Lee el archivo como una URL de datos
      reader.onloadend = (e) => {
        if(e.target !== null){
          const url = e.target['result'] as string;
          this.imgEvent = e.target['result'] as string;
          this.formNewEvent.setValue({url_img: url});  // Establece la URL en la variable
        }
      };
    }
  }

  onSubmitReservation(){
    console.log(this.formNewEvent.value);

    this.close();
  }
}
