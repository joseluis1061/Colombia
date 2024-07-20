import { Component, inject, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRef, DIALOG_DATA, DialogModule } from '@angular/cdk/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { FirestoreService } from '../../../../../../services/firestore.service';
import { FirebaseStorageService } from '../../../../../../services/firebase-storage.service';
interface InputData {
  name: string;
}
interface OutputData {
  rta: Boolean;
}

interface IRegion {
  id: string;
  name: string;
  legend: string;
  image: string;
  date: Date;
}

@Component({
  selector: 'app-form-create-region',
  standalone: true,
  imports: [CommonModule, DialogModule, ReactiveFormsModule],
  templateUrl: './form-create-region.component.html',
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
export class FormCreateRegionComponent  implements OnInit{

  createRegionForm: FormGroup = new FormGroup({});
  newFile: any|null = null;
  newRegion: IRegion = {
    id: "",
    name: "",
    legend: "",
    image: "",
    date: new Date
  };

  private firestoreService = inject(FirestoreService);
  private firebaseStorageService = inject(FirebaseStorageService);

  constructor(
    private dialogRef: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) data: InputData
  ) {
  }

  ngOnInit(): void {
    this.initFormParent();
  }
  initFormParent(){
    this.createRegionForm = new FormGroup({
      name: new FormControl('', Validators.required),
      legend: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    });
  }

  onSubmitRegion(){
    console.log(this.createRegionForm.value);
    console.log("Imagenes:: ", this.createRegionForm.get("images")?.value);
    this.newRegion.name = this.createRegionForm.get("nmae")?.value;
    this.newRegion.name = this.createRegionForm.get("legend")?.value;
    this.newRegion.name = this.createRegionForm.get("image")?.value;

    const name = this.createRegionForm.get("name")?.value;
    let path = "";
    if(name) path = `Regions/${name}`;

    console.log("PATH: ", path);

    this.firestoreService.createDocument(this.newRegion, path).then(
      getRef => {
        console.log("ReferenciaID: ", getRef)
      }
    )

    //if(this.newFile !== null) this.firebaseStorageService.uploadFile()
    this.close();
  }


  async upLoadImage(event: any){
    console.log("Upload Img")
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // Lee el archivo como una URL de datos
      reader.onloadend = (e) => {
        if(e.target !== null){
          this.newRegion.image = e.target['result'] as string; // Establece la URL en la variable
        }
      };
    }
  }

  close(){
    this.dialogRef.close();
  }

}
