import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { UsersExtended } from '../../models/users.model';

export const adminRoleGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const firestoreService = inject(FirestoreService);
  let currentUser: UsersExtended;

  async function canActive(): Promise<boolean> {
    try {
      const userCurrent = await authService.isAuthenticated().toPromise();
      if (userCurrent) {
        currentUser = userCurrent;
        if (currentUser) {
          firestoreService.getUser(currentUser.uid).subscribe({
            next: response => console.log("TRAER un Usuario: ", response)
          })
          const response = await firestoreService.getCollectionUser(currentUser.uid);
          return response?.role === "provider";
        }
      }
      return false;
    } catch (error) {
      console.log("CurrentUser guard error: ", error);
      return false;
    }
  }



  return await canActive();

};
