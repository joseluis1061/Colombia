import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { DialogModule } from '@angular/cdk/dialog';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

interface OutputData {
  rta: Boolean;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, DialogModule ],
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

  constructor(
    private dialogRef: DialogRef<OutputData>,
  ) {}


  ngOnInit(): void { }

  close() {
    this.dialogRef.close();
  }

  closeWithRta(rta: boolean) {
    this.dialogRef.close({ rta });
  }

}
