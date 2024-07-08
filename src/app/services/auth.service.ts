import { inject, signal } from '@angular/core';
import { Injectable } from '@angular/core';
import { Auth, User, user } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { FirestoreService } from './firestore.service';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { UsersExtended } from '../models/users.model';

import { IServicePartial } from '../models/serrvices.model';
import { IUserAuthOmit, IUserAuthPartial } from '../models/auth.model';
import { Router } from '@angular/router';

import { IUserAuth } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private firestoreService= inject(FirestoreService);
  private auth = inject(Auth);
  currentUser = signal<IUserAuthPartial>({});

  private router: Router = inject(Router);
  user$ = user(this.auth);
  userSubscription!: Subscription;
  currentUserState$ = new BehaviorSubject<User|null>(null);
  private currentUserState: User|null = null;


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

          const data:IUserAuthOmit = {
            userUid: userId,
            email: userData.value.email,
            phone: userData.value.phone,
            role: userData.value.role,
            statusActive: true
          }
          const newCollection = await this.firestoreService.creteCollectionUser('users', data);
          //return { success: true, data: newCollection.data };
          try{
            const dataService:IServicePartial = {
              nameService: userData.value.nameService,
              typeService: userData.value.typeService,
              statusActive: true
            }
            const firstService = await this.firestoreService.creteCollectionFirstServices('service', dataService, data.userUid?.toString() || "");
            this.currentUser.set(newCollection.data || {});
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


  setCurrentUser( userData:IUserAuthPartial){
    console.log("UserData: ", userData);
    this.currentUser.set(userData)
  }

  async getUser(){
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const uid = user.uid;
        //this.currentUser.set(user);
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




  ////Nueva version
  constructor() {
    this.getUid();
    this.stateAuth();
  }

  login(email:string, password: string){
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  registerUser(email: string, password: string){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  stateAuth(){
    onAuthStateChanged(this.auth, user => {
      if(user){
        this.currentUserState= user;
        this.currentUserState$.next(this.currentUserState);
        return this.currentUserState;
      }
      else{

        return of(null);
      }
    })
  }


  async getUid(){
    const user = await this.auth.currentUser;
    if(user === undefined) {
      return null;
    }else{
      return user?.uid;
    }
  }

  // logout(){
  //   return signOut(this.auth);
  // }

}
