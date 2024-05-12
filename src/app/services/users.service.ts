import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { RootObject, UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private urlApi = 'https://randomuser.me/api/';
  private http = inject(HttpClient);

  user = signal<UserModel | null>(null)

  constructor() { }

  getUser(): Observable<UserModel>{
    return this.http.get<RootObject>(this.urlApi).pipe(
      map((response: RootObject) => {
        return response.results[0] as UserModel;
      })
    );
  }


}
