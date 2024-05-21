import { Component, inject, OnInit, signal } from '@angular/core';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { FirestoreService } from './firestore.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private firestoreService= inject(FirestoreService)
  private auth = inject(Auth);
  currentUser = signal({});


  constructor() { }

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
          rol: userData.value.rol
        }
        const newCollection = this.firestoreService.crearColeccion('users', data);
      }
      return user;
    } catch (error) {
      console.log("Error de login: ", error);
      // throw error;
      return error;
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

  // Función para verificar si hay un usuario logeado
  isAuthenticated(): Observable<any> {
    return new Observable(observer => {
      onAuthStateChanged(this.auth, user => {
        if (user) {
          observer.next(user);
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
}
