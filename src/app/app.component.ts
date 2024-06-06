import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FirestoreService } from './services/firestore.service';
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
  firestoreService = inject(FirestoreService);
  // firestore: Firestore = inject(Firestore);
  // item$!: Observable<Item[]>;

  // constructor() {
  //   const itemCollection = collection(this.firestore, 'items');
  //   this.item$ = collectionData(itemCollection) as Observable<Item[]>;
  // }


  ngOnInit(): void {
    this.firestoreService.getCollectionUser('qjstSW3DywYZPcDULIrDgeVdAWU2');
    
  }
}
