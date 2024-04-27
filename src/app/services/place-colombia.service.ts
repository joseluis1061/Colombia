import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Regions } from '../models/colombian.models';

@Injectable({
  providedIn: 'root'
})
export class PlaceColombiaService {

  private urlApi = environment.API_URL;
  private http = inject(HttpClient);


  getRegions(){
    return this.http.get<Regions[]>(`https://api-colombia.com/api/v1/Region`)
  }
}
