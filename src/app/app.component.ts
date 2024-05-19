import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// import { Firestore, collection, collectionData, getDocs } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';

// interface Item {
//   name: string,
// };

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'turismo-comunitario';
  // firestore: Firestore = inject(Firestore);
  // item$!: Observable<Item[]>;

  // constructor() {
  //   const itemCollection = collection(this.firestore, 'items');
  //   this.item$ = collectionData(itemCollection) as Observable<Item[]>;
  // }


  ngOnInit(): void {

  }
}
