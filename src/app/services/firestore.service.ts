import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, getDocs, getDoc, getFirestore, setDoc } from '@angular/fire/firestore';
import { error } from 'console';
import { IUserAuthPartial } from '../models/auth.model';
import { Users } from '../models/users.model';
import { Observable, from, map, of } from 'rxjs';
import { user } from '@angular/fire/auth';
import { deleteDoc, updateDoc } from 'firebase/firestore';

import { IDataUser } from '../models/user.model';
import { IServicePartial } from '../models/serrvices.model';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  firestore: Firestore = inject(Firestore);

  constructor() { }

  // Crear colección de usuarios
  async creteCollectionUser(nombreColeccion: string, datos: IUserAuthPartial) {
    const path =  datos?.userUid?.toString() || "";
    try{
      const docRef = doc(this.firestore, `${nombreColeccion}/${path}`);
      await setDoc(docRef, datos);
      return { success: true, data: datos };
    }catch(error){
      return { success: false, error: 'Failed to create user document.', details: error };
    }
  }

    // Crear colección de primer servicio
    async creteCollectionFirstServices(nombreColeccion: string, datos: IServicePartial, uid: string) {
      const path =  uid.toString();
      try{
        const docRef = doc(this.firestore, `${nombreColeccion}/${path}`);
        await setDoc(docRef, datos);
        return { success: true, data: datos };
      }catch(error){
        return { success: false, error: 'Failed to create user document.', details: error };
      }
    }

  // Traer datos de un usuario
  async getCollectionUser(userId: string): Promise<IUserAuthPartial | null>{
    const db = getFirestore();

    const docRef = doc(db, "users", `${userId}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      return docSnap.data() as IUserAuthPartial;
    } else {
      // docSnap.data() will be undefined in this case
      //console.log("No such document!");
      return null;
    }
  }

  getUser(userId: string){
    return from(getDoc(doc(this.firestore, 'users', userId))).pipe(
      map((snapShot) => snapShot.data() as IUserAuthPartial)
    );
  }

  getAllUsers(){
    const collectionUser = collection(this.firestore, 'users');
    return collectionData(collectionUser, {idField: 'id'}) as Observable<IUserAuthPartial[]>;
  }

  updateUser(userId: string, data: any){
    const docRef = doc(this.firestore, 'users', userId);
    return updateDoc(docRef, {...data})
  }

  deleteUser(userId: string){
    const docRef = doc(this.firestore, 'users', userId);
    return of(deleteDoc(docRef));
  }



}
