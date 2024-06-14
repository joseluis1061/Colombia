import { Component, inject, OnInit, signal } from '@angular/core';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { getApp } from "firebase/app";
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { FirestoreService } from './firestore.service';
import { Observable, from, of } from 'rxjs';
import { UsersExtended } from '../models/users.model';

import { FirebaseStorageService } from './firebase-storage.service';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { switchMap, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private firestore = inject(Firestore);
  private firestoreService= inject(FirestoreService);
  private firebaseStorageService = inject(FirebaseStorageService);
  private storage = getStorage();
  private auth = inject(Auth);
  currentUser = signal({});


  signInUser(email:string, password:string){
    signInWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      location.reload();
      console.log("Login User: ", userCredential);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error de login: ", error);
    });
  }


  async createUser(userData:any){
    console.log("Image: ", userData.value.image)

    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, userData.value.email, userData.value.password);
      // Signed in
      const user = userCredential.user;
      console.log('Register user success: ', user);
      if(user){
        const data = {
          userUid: user.uid,
          email: userData.value.email,
          phone: userData.value.phone,
          role: userData.value.role,
          nameService: userData.value.nameService,
          typeService: userData.value.typeService,
          statusActive: true,
          //image: userData.value.image
        }
        const newCollection = this.firestoreService.creteCollectionUser('users', data);
        console.log("NewCollection: ", newCollection)
      }
      return user;
    } catch (error) {
      console.log("Error de login: ", error);
      // throw error;
      return error;
    }
  }

  async register(userData: any): Promise<void> {
    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(this.auth, userData.value.email, userData.value.password);
      const userId = userCredential.user?.uid;
      const image = userData.value.image;
      console.log(userData)

      if (userId) {
        //const filePath = `images/users/${userId}/profile.jpg`;
        try {

          const data = {
            userUid: userId,
            email: userData.value.email,
            phone: userData.value.phone,
            role: userData.value.role,
            nameService: userData.value.nameService,
            typeService: userData.value.typeService,
            statusActive: true,
            //image: userData.value.image
          }
          const newCollection = this.firestoreService.creteCollectionUser('users', data);
          //const downloadURL = await this.firebaseStorageService.uploadFile(filePath, userData.value.image);
          // Save downloadURL to user's profile or Firestore if needed
        } catch (error) {
          // Handle failure in file upload
          await userCredential.user?.delete();
          throw new Error('Failed to upload image. Please try again.');
        }
      }
    } catch (error) {
      throw error;
    }
  }



  async getUser(){
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const uid = user.uid;
        this.currentUser.set(user);
        return this.currentUser;
      } else {
        console.log("Sin USUARIO");
        return null
      }
    });
    return this.currentUser
  }

  isAuthenticated(): Observable<UsersExtended | null> {
    return new Observable<UsersExtended | null>(observer => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          const userData: UsersExtended = {
            uid: user.uid,
            email: user.email,
          };
          observer.next(userData);
        } else {
          observer.next(null);
        }
        observer.complete();
      });
    });
  }

  async logout() {
    try {
      this.auth.signOut()
    } catch (error) {
      console.log(error);
    }
  }




  /*
  register(user: any, image: File | null): Observable<any> {
    // Registro del usuario
    return from(this.afAuth.createUserWithEmailAndPassword(user.email, user.password)).pipe(
      switchMap((userCredential) => {
        if (!userCredential.user) {
          throw new Error('No se pudo crear el usuario');
        }

        const uid = userCredential.user.uid;
        const userData = {
          email: user.email,
          phone: user.phone,
          idIdentification: user.idIdentification,
          role: user.role,
          nameService: user.role === 'provider' ? user.nameService : '',
          typeService: user.role === 'provider' ? user.typeService : '',
        };

        // Guardar los datos del usuario en Firestore
        return from(this.angularFirestore.collection('users').doc(uid).set(userData)).pipe(
          switchMap(() => {
            if (user.role === 'provider' && image) {
              // Subir la imagen al storage si el rol es provider
              const filePath = `images/${uid}/${image.name}`;
              const fileRef = this.storage.ref(filePath);
              return this.angularFireStorage.upload(filePath, image).snapshotChanges().pipe(
                switchMap(() => {
                  return fileRef.getDownloadURL().pipe(
                    switchMap((downloadURL) => {
                      // Guardar la URL de la imagen en Firestore
                      return this.firestore.collection('users').doc(uid).update({ imageUrl: downloadURL });
                    })
                  );
                })
              );
            } else {
              return from(Promise.resolve(null));
            }
          }),
          catchError((error) => {
            // Si ocurre un error, eliminar el usuario creado
            return from(this.afAuth.currentUser).pipe(
              switchMap((currentUser) => {
                if (currentUser) {
                  return from(currentUser.delete()).pipe(
                    switchMap(() => {
                      throw error;
                    })
                  );
                } else {
                  throw error;
                }
              })
            );
          })
        );
      })
    );
  }
  */

}
