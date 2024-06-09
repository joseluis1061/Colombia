export interface Departamentos{
  name: string;
  description: string;
  ubicacion: Ubicacion;
  municipios: string;
  phonePrefix: string;
  naturalArea: NaturalArea[];
  touristPlaces: TouristPlaces[];
}
export interface Municipio{
  nombre: string;
  departamentoId: string;
  sitiosTuristicos: string;
  phonePrefix: string;
  ubicacion: Ubicacion;
  capital: boolean;
}
interface NaturalArea{

}

interface TouristPlaces{

}

interface Ubicacion{
  latitud: string;
  longitud: string;
}

