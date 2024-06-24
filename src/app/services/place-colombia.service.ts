import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Colombia, Regions, RegionDeparments, Department, City, TouristAttraction, President, CategoryNaturalArea, MapColombian } from '../models/colombian.models';
import { map } from 'rxjs';
import { REGIONS_IMAGE } from '../shared/constants/regions-image.const';

@Injectable({
  providedIn: 'root'
})
export class PlaceColombiaService {

  private urlApi = environment.API_URL;
  colombia = signal<Colombia | null>(null);
  regions = signal<Regions[]>([]);

  private http = inject(HttpClient);

  getGeneralColombia(){
    this.http.get<Colombia>(`${this.urlApi}/Country/Colombia`)
      .subscribe({
        next: (res) => this.colombia.set(res)
      });
  }

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
    return this.http.get<Regions>(`https://api-colombia.com/api/v1/Region/${id}`)
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
  getDeparments(){
    return this.http.get<Department[]>(`https://api-colombia.com/api/v1/Deparment`);
  }
  getDeparmentsById(id:string){
    return this.http.get<Department>(`https://api-colombia.com/api/v1/Deparment/${id}`);
  }
  getDeparmentsByIdCities(id:string){
    //cities
    return this.http.get<City[]>(`https://api-colombia.com/api/v1/Deparment/${id}/cities`);
  }
  getDeparmentsByIdNaturalareas(id:string){
    return this.http.get<Department[]>(`https://api-colombia.com/api/v1/Deparment/${id}/naturalareas`);
  }
  getDeparmentsByIdTouristicattractions(id:string){
    return this.http.get<TouristAttraction[]>(`https://api-colombia.com/api/v1/Deparments/${id}/touristicattractions`);
  }
  getDeparmentsByName(name:string){
    return this.http.get<Department[]>(`https://api-colombia.com/api/v1/Deparment/name/${name}`);
  }
  searchDeparmentsByKeyword(keyword:string){
    return this.http.get<Department>(`https://api-colombia.com/api/v1/Deparment/search/${keyword}`);
  }
  getCities(){
    return this.http.get<City>(`https://api-colombia.com/api/v1/City`);
  }

  getCitiesById(id:string){
    return this.http.get<City>(`https://api-colombia.com/api/v1/City/${id}`);
  }
  getCitiesByName(name:string){
    return this.http.get<City>(`https://api-colombia.com/api/v1/City/name/${name}`);
  }
  searchCitiesByKeyword(keyword:string){
    return this.http.get<City[]>(`https://api-colombia.com/api/v1/City/search/${keyword}`);
  }

  ///
  getPresident(){
    return this.http.get<President[]>(`https://api-colombia.com/api/v1/President`);
  }

  getPresidentById(id:string){
    return this.http.get<President>(`https://api-colombia.com/api/v1/President/${id}`);
  }
  getPresidentByName(name:string){
    return this.http.get<President>(`https://api-colombia.com/api/v1/President/name/${name}`);
  }
  searchPresidentByKeyword(keyword:string){
    return this.http.get<President[]>(`https://api-colombia.com/api/v1/President/search/${keyword}`);
  }
  ////
  getTouristicAttraction(){
    return this.http.get<TouristAttraction[]>(`https://api-colombia.com/api/v1/TouristicAttraction`);
  }
  getTouristicAttractionById(id:string){
    return this.http.get<TouristAttraction>(`https://api-colombia.com/api/v1/TouristicAttraction/${id}`);
  }
  getTouristicAttractionByName(name:string){
    return this.http.get<TouristAttraction>(`https://api-colombia.com/api/v1/TouristicAttraction/name/${name}`);
  }
  searchTouristicAttractionByKeyword(keyword:string){
    return this.http.get<TouristAttraction[]>(`https://api-colombia.com/api/v1/TouristicAttraction/search/${keyword}`);
  }
  ///
  getCategoryNaturalArea(){
    return this.http.get<CategoryNaturalArea[]>(`https://api-colombia.com/api/v1/CategoryNaturalArea`);
  }

  getCategoryNaturalAreaById(id:string){
    return this.http.get<CategoryNaturalArea>(`https://api-colombia.com/api/v1/CategoryNaturalArea/${id}`);
  }
  getCategoryNaturalAreaByIdNaturalAreas(id:string){
    return this.http.get<CategoryNaturalArea>(`https://api-colombia.com/api/v1/CategoryNaturalArea/${id}/NaturalAreas`);
  }
  //////
  getNaturalArea(){
    return this.http.get<TouristAttraction[]>(`https://api-colombia.com/api/v1/NaturalArea`);
  }
  getNaturalAreaById(id:string){
    return this.http.get<TouristAttraction>(`https://api-colombia.com/api/v1/NaturalArea/${id}`);
  }
  getNaturalAreaByName(name:string){
    return this.http.get<TouristAttraction>(`https://api-colombia.com/api/v1/NaturalArea/name/${name}`);
  }
  searchNaturalAreaByKeyword(keyword:string){
    return this.http.get<TouristAttraction[]>(`https://api-colombia.com/api/v1/NaturalArea/search/${keyword}`);
  }
  //
  getMap(){
    return this.http.get<MapColombian[]>(`https://api-colombia.com/api/v1/Map`);
  }
  getMapById(id:string){
    return this.http.get<MapColombian>(`https://api-colombia.com/api/v1/Map/${id}`);
  }


}
