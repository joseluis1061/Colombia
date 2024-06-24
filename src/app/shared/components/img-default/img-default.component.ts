import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-img-default',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './img-default.component.html'
})
export class ImgDefaultComponent {
  img:string = '';
  imgDefalult = 'https://firebasestorage.googleapis.com/v0/b/turismocomunitario-173e7.appspot.com/o/assets%2Fweb%2Fdefault.png?alt=media&token=1cef4130-e439-43cc-851d-6d337b1eff36';

  @Input('img') set onChangeImg(img:string){
    this.img = img;
  }

  @Output() loader = new EventEmitter<string>();

  imageError(){
    this.img = this.imgDefalult;
  }

  imageLoad(img:string){
    console.log("Desde el hijo ", img);
    this.loader.emit(`imgUrl: ${img}`);
  }

  ngOnDestroy(): void {
    console.log('OnDestroy');
  }

}
