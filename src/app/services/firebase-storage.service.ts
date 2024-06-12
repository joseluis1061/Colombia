import { Injectable } from '@angular/core';
import { getApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {
  firebaseApp = getApp();
  // Create a root reference
  storage = getStorage();

  userImagePerfil(file: any, uid: string){
    console.log("File: ", file);
    // Referencia donde sube el archivo
    const storageRef = ref(this.storage, `imgStorage/${uid}/${file.name}`);
    // Subir el archivo
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Estado de progreso de subida del archivo
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    )
  }
}
