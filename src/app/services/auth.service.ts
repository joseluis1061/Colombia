import { inject, signal } from '@angular/core';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { FirestoreService } from './firestore.service';
import { Observable, from, of } from 'rxjs';
import { UsersExtended } from '../models/users.model';


import { IDataUser, IService } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private firestoreService= inject(FirestoreService);
  private auth = inject(Auth);
  currentUser = signal({});


  signInUser(email:string, password:string){
    signInWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      //const user = userCredential.user;
      location.reload();
      console.log("Login User: ", userCredential);
      alert("Has ingresado correctamente");
    })
    .catch((error) => {
      //const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Ha ocurrido un error al intentar ingresar ${errorMessage}`);
    });
  }

  async register(userData: any): Promise<any> {
    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(this.auth, userData.value.email, userData.value.password);
      const userId = userCredential.user?.uid;
      if (userId) {
        try {

          const data:IDataUser = {
            userUid: userId,
            email: userData.value.email,
            phone: userData.value.phone,
            role: userData.value.role,
            statusActive: true
          }
          const newCollection = await this.firestoreService.creteCollectionUser('users', data);
          //return { success: true, data: newCollection.data };
          try{
            const dataService:IService = {
              nameService: userData.value.nameService,
              typeService: userData.value.typeService,
              statusActive: true
            }
            const firstService = await this.firestoreService.creteCollectionFirstServices('service', dataService, data.userUid.toString());
            return { success: true, data: newCollection.data };
          }catch(error){
            return { success: false, error: 'Failed to create user collection or upload image. Please try again.', details: error };
          }

        } catch (error) {
          await userCredential.user?.delete();
          return { success: false, error: 'Failed to create user. Please try again.', details: error };
        }
      }
    } catch (error) {
      return { success: false, error: 'Failed to create user collection or upload image. Please try again.', details: error };
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

}
