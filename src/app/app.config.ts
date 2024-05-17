import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(withFetch()), provideFirebaseApp(() => initializeApp({"projectId":"turismo-f9aa8","appId":"1:691653797325:web:815c932aad0905c83fd084","storageBucket":"turismo-f9aa8.appspot.com","apiKey":"AIzaSyDXBR1rIFiXlcTl62M2e6RtbJXCeork4Yc","authDomain":"turismo-f9aa8.firebaseapp.com","messagingSenderId":"691653797325"})), provideAuth(() => getAuth()), provideStorage(() => getStorage())]
};
