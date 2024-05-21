import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, getDocs, getFirestore } from '@angular/fire/firestore';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  firestore: Firestore = inject(Firestore);

  constructor() { }

  // Función para crear una colección
  crearColeccion(nombreColeccion: string, datos: any) {
    try{
      const colRef = collection(this.firestore, nombreColeccion);
      return addDoc(colRef, datos);
    }catch(error){
      return error;
    }
  }


}
