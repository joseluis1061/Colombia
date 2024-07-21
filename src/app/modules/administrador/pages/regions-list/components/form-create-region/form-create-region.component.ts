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

  async onSubmitRegion(){
    console.log(this.createRegionForm.value);
    console.log("Imagenes:: ", this.createRegionForm.get("images")?.value);
    this.newRegion.name = this.createRegionForm.get("name")?.value;
    this.newRegion.legend = this.createRegionForm.get("legend")?.value;

    // Nueva region
    if (this.newRegion.id.length <= 0){
      // Crear documento
      const id = await this.saveRegion();

      // Guardar imagen y agregar url al documento
      if(id.length > 0 && this.newFile !== null) {
        console.log("NEW FILE: ", this.newFile);
        const url = await this.saveImage(id);
        await this.updateRegion(id);
      };
    }
    // Actualizar region
    else{
      // Guardar imagen y agregar url al documento
      if(this.newFile !== null) {
        console.log("NEW FILE: ", this.newFile);
        const url = await this.saveImage(this.newRegion.id);
      };
      await this.updateRegion(this.newRegion.id);
    }

    this.close();
  }

  async saveRegion(){
    let id = "";
    await this.firestoreService.addDocument(this.newRegion, 'Regions').then(
      res => {
        id = res.id.toString();
        console.log("ADD DOC: ", id)
      }
    );
    return id;
  }
  async updateRegion(id:string){
    await this.firestoreService.createDocumentID(this.newRegion, 'Regions', id).then(
      res => {
        console.log("Upload DOC: ", res)
      }
    );
    return id;
  }
  async saveImage(id: string){
    let url = "";
    await this.firebaseStorageService.uploadFile(`Regions/${id}`, this.newFile).then(
      urlImg => {
        this.newRegion.image = urlImg;
        this.newRegion.id = id;
        console.log("NewRegion: ", this.newRegion);
      }
    )
    return url;
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
