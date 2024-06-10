import { Injectable } from '@angular/core';
import { getApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {
  firebaseApp = getApp();
  // Create a root reference
  storage = getStorage();

  userImagePerfil(file: any, uid: string){
    console.log("File: ", file);
    // Create a root reference
    const storage = getStorage();
    const mountainImagesRef = ref(storage, `imgStorage/${uid}/${file.name}`);
  }
}
