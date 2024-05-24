import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, getDocs, getFirestore, setDoc } from '@angular/fire/firestore';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  firestore: Firestore = inject(Firestore);

  constructor() { }

  // Función para crear una colección
  creteCollectionUser(nombreColeccion: string, datos: any) {
    const path =  datos.userUid.toString();
    try{
      const docRef = doc(this.firestore, `${path}/${nombreColeccion}`);
      return setDoc(docRef, datos);
      // const colRef = collection(this.firestore, path, nombreColeccion);
      //return addDoc(colRef, datos);
    }catch(error){
      return error;
    }
  }


}
