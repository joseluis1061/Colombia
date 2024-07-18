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
    });
  }

  onSubmitRegion(){
    console.log(this.createRegionForm.value);
    this.close();
  }

  close(){
    this.dialogRef.close();
  }

}
