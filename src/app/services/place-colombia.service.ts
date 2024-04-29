import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Regions, RegionDeparments, Department } from '../models/colombian.models';
import { map } from 'rxjs';
import { REGIONS_IMAGE } from '../shared/constants/regions-image.const';

@Injectable({
  providedIn: 'root'
})
export class PlaceColombiaService {

  private urlApi = environment.API_URL;
  private http = inject(HttpClient);


  getRegions(){
    return this.http.get<Regions[]>(`https://api-colombia.com/api/v1/Region`)
    .pipe(
      map( region => {
        return region.map(regionItem => {
          const position = REGIONS_IMAGE.findIndex(element => element.id === regionItem.id.toString());
          if(position !== -1){
            return{
              ...regionItem,
              image: REGIONS_IMAGE[position].url
            }
          }else{
            return {
              ...regionItem,
              image: ''
            }
          }
        })
      }
    )
    )
  }
  getRegionsById(id: string){
    return this.http.get<Regions[]>(`https://api-colombia.com/api/v1/Region/${id}`)
  }

  getDeparments(){
    return this.http.get<Regions[]>(`https://api-colombia.com/api/v1/Deparments`)
  }
  getRegionsByIdDepartments(id: string): any{
    return this.http.get<RegionDeparments>(`https://api-colombia.com/api/v1/Region/${id}/departments`)
    .pipe(
      map((regionDeparments:RegionDeparments) => {
        console.log("Deparments--: ",regionDeparments)
        return regionDeparments.departments
        //Department
      })
    )
  }
}
