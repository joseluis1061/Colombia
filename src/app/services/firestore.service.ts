import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, getDocs, getDoc, getFirestore, setDoc } from '@angular/fire/firestore';
import { error } from 'console';
import { AuthInterfase } from '../models/auth.model';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  firestore: Firestore = inject(Firestore);

  constructor() { }

  // Crear colección de usuarios
  creteCollectionUser(nombreColeccion: string, datos: any) {
    const path =  datos.userUid.toString();
    try{
      const docRef = doc(this.firestore, `${nombreColeccion}/${path}`);
      return setDoc(docRef, datos);
    }catch(error){
      return error;
    }
  }

  // Traer datos de usuario
  async getCollectionUser(userId: string): Promise<AuthInterfase | null>{
    const db = getFirestore();

    const docRef = doc(db, "users", `${userId}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      return docSnap.data() as AuthInterfase;
    } else {
      // docSnap.data() will be undefined in this case
      //console.log("No such document!");
      return null;
    }
  }


}
