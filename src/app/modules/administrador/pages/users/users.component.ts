import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../services/firestore.service';
import { IDataUser } from '../../../../models/user.model';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  firestoreService = inject(FirestoreService);
  users: IDataUser[] = [];

  ngOnInit(): void {
    this.firestoreService.getCollectionChanges<IDataUser>("users").subscribe({
      next: (users) => {
        this.users = users;
        console.log("Usuarios:: ", this.users);
      },
      error: error => console.log("Error de usuarios", error)
    })
  }



}
