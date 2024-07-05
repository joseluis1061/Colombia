import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, getDoc, getFirestore, setDoc } from '@angular/fire/firestore';
import { IUserAuthPartial } from '../models/auth.model';
import { Observable, from, map, of } from 'rxjs';
import { addDoc, deleteDoc, DocumentReference, updateDoc } from 'firebase/firestore';

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

  // Funciones generales firebase
  // Traer elemento sin suscribirme a los cambios
  getDocument<tipo>(path: string){
    const document = doc(this.firestore, path) as DocumentReference<tipo, any>;
    return getDoc<tipo, any>(document);
  }

  // Traer elemento sin suscribirme a los cambios
  getDocumentChanges<tipo>(path: string){
    const document = doc(this.firestore, path);
    return docData(document) as Observable<tipo>;
  }

  getCollectionChanges<tipo>(path: string){
    const itemCollection = collection(this.firestore, path);
    return collectionData(itemCollection) as Observable<tipo[]>;
  }

  // Crear documento con id incluido en el path
  createDocument(data: any, path: string){
    const document = doc(this.firestore, `${path}`);
    return setDoc(document, data);
  }
  // Crear documento con id del documento manual
  createDocumentID(data: any, path: string, idDoc: string){
    const document = doc(this.firestore, `${path}/${idDoc}`);
    return setDoc(document, data);
  }

  // Crear documento con id del documento automatico
  async addDocument(data: any, path: string){
    const collectionRef = collection(this.firestore, path);
    await addDoc(collectionRef, data);
  }

  async updateDocumentID(data:any, path:string, idDoc:string){
    const document = doc(this.firestore, `${path}/${idDoc}`);
    return updateDoc(document, data);
  }

  deleteDocumentID(path: string, idDoc: string){
    const document = doc(this.firestore, `${path}/${idDoc}`);
    return deleteDoc(document);
  }

  deleteDocFromRef(ref: any){
    return deleteDoc(ref);
  }

  createIdDoc(){
    const { v4: uuidv4 } = require('uuid');
    return uuidv4();
  }



}
