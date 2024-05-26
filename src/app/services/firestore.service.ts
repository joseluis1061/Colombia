import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, getDocs, getDoc, getFirestore, setDoc } from '@angular/fire/firestore';
import { error } from 'console';
import { UserAuthInterfase } from '../models/auth.model';
import { Users } from '../models/users.model';
import { Observable, from, map, of } from 'rxjs';
import { user } from '@angular/fire/auth';
import { deleteDoc, updateDoc } from 'firebase/firestore';
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

  // Traer datos de un usuario
  async getCollectionUser(userId: string): Promise<UserAuthInterfase | null>{
    const db = getFirestore();

    const docRef = doc(db, "users", `${userId}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      return docSnap.data() as UserAuthInterfase;
    } else {
      // docSnap.data() will be undefined in this case
      //console.log("No such document!");
      return null;
    }
  }

  getUser(userId: string){
    return from(getDoc(doc(this.firestore, 'users', userId))).pipe(
      map((snapShot) => snapShot.data() as UserAuthInterfase)
    );
  }

  getAllUsers(){
    const collectionUser = collection(this.firestore, 'users');
    return collectionData(collectionUser, {idField: 'id'}) as Observable<UserAuthInterfase[]>;
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
