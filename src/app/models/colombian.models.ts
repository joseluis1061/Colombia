export interface Colombia {
  id: number;
  name: string;
  description: string;
  stateCapital: string;
  surface: number;
  population: number;
  languages: string[];
  timeZone: string;
  currency: string;
  currencyCode: string;
  currencySymbol: string;
  isoCode: string;
  internetDomain: string;
  phonePrefix: string;
  radioPrefix: string;
  aircraftPrefix: string;
  subRegion: string;
  region: string;
  borders: string[];
  flags: string[];
}


export interface Regions {
  id:          number;
  name:        string;
  description: string;
  departments: null;
  image?:      string;
}

//Deparment
export interface RegionDeparments {
  id: number;
  name: string;
  description: string;
  departments: Department[];
}

export interface Department {
  id: number;
  name: string;
  description: string;
  cityCapitalId: number;
  municipalities: number;
  surface: number;
  population: number;
  phonePrefix: string;
  countryId: number;
  cityCapital: CityCapital | null;
  country: Country | null;
  cities: City[] | null;
  regionId: number;
  region: string | null;
  naturalAreas: NaturalArea[] | null;
  MapColombians: MapColombian[] | null;
  indigenousReservations: IndigenousReservation[] | null;
  airports: Airport[] | null;
}

export interface CityCapital {
  id: number;
  name: string;
  description: string;
  surface: number;
  population: number;
  postalCode: string;
  departmentId: number;
  department: string;
  touristAttractions: TouristAttraction[];
  presidents: President[];
  indigenousReservations: IndigenousReservation[];
  airports: Airport[];
  radios: Radio[];
}

export interface TouristAttraction {
  id: number;
  name: string;
  description: string;
  images: string[];
  latitude: string;
  longitude: string;
  cityId: number;
  city: City | string;
}
export interface Country {
  id: number;
  name: string;
  description: string;
  stateCapital: string;
  surface: number;
  population: number;
  languages: string[];
  timeZone: string;
  currency: string;
  currencyCode: string;
  currencySymbol: string;
  isoCode: string;
  internetDomain: string;
  phonePrefix: string;
  radioPrefix: string;
  aircraftPrefix: string;
  subRegion: string;
  region: string;
  borders: string[];
  flags: string[];
}

export interface City {
  id: number;
  name: string;
  description: string;
  surface: number;
  population: number;
  postalCode: string;
  departmentId: number;
  department: Department | null;
  touristAttractions: TouristAttraction[] | null;
  presidents: President[] | null;
  indigenousReservations: IndigenousReservation[] | null;
  airports: Airport[] | null;
  radios: Radio[] | null;
}

export interface President {
  id: number;
  image: string;
  name: string;
  lastName: string;
  startPeriodDate: string;
  endPeriodDate: string;
  politicalParty: string;
  description: string;
  cityId: number;
  city: string;
}
export interface Airport {
  id: number;
  name: string;
  iataCode: string;
  oaciCode: string;
  type: string;
  deparmentId: number;
  department: string;
  cityId: number;
  city: string;
  latitude: number;
  longitude: number;
}
export interface Radio {
  id: number;
  name: string;
  frequency: number;
  band: string;
  cityId: number;
  city: string;
  url: string;
  streamers: string[];
}
export interface NaturalArea {
  id: number;
  areaGroupId: number;
  categoryNaturalAreaId: number;
  name: string;
  departmentId: number;
  daneCode: number;
  landArea: number;
  maritimeArea: number | null;
  department: string | null;
  categoryNaturalArea: CategoryNaturalArea | null;
}

export interface CategoryNaturalArea {
  id: number;
  name: string;
  description: string;
  naturalAreas: string[];
}

export interface MapColombian {
  id: number;
  name: string;
  description: string;
  departmentId: number;
  urlImages: string[];
  urlSource: string;
  department: Department | null;
}
export interface IndigenousReservation {
  id: number;
  name: string;
  code: string;
  procedureType: string;
  administrativeActType: string;
  administrativeActNumber: number;
  administrativeActDate: string;
  nativeCommunityId: number;
  nativeCommunity: NativeCommunity;
  deparmentId: number;
  department: string;
  cityId: number;
  city: string;
}
export interface NativeCommunity {
  id: number;
  name: string;
  description: string;
  languages: string;
  images: string[];
  indigenousReservations: string[];
}
