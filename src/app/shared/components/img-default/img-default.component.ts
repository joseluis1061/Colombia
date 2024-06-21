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
  imgDefalult = './assets/images/default.png';

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
