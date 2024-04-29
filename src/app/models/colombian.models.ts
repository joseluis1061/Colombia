export interface Regions {
  id:          number;
  name:        string;
  description: string;
  departments: null;
  image?:      string;
}

//Deparment
export interface RegionDeparments {
  id: number
  name: string
  description: string
  departments: Department[]
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
  maps: Map[] | null;
  indigenousReservations: IndigenousReservation3[] | null;
  airports: Airport[] | null;
}

export interface CityCapital {
  id: number
  name: string
  description: string
  surface: number
  population: number
  postalCode: string
  departmentId: number
  department: string
  touristAttractions: TouristAttraction[]
  presidents: President[]
  indigenousReservations: IndigenousReservation[]
  airports: Airport[]
  radios: Radio[]
}

export interface TouristAttraction {
  id: number
  name: string
  description: string
  images: string[]
  latitude: string
  longitude: string
  cityId: number
  city: string
}

export interface President {
  id: number
  image: string
  name: string
  lastName: string
  startPeriodDate: string
  endPeriodDate: string
  politicalParty: string
  description: string
  cityId: number
  city: string
}

export interface IndigenousReservation {
  id: number
  name: string
  code: string
  procedureType: string
  administrativeActType: string
  administrativeActNumber: number
  administrativeActDate: string
  nativeCommunityId: number
  nativeCommunity: NativeCommunity
  deparmentId: number
  department: string
  cityId: number
  city: string
}

export interface NativeCommunity {
  id: number
  name: string
  description: string
  languages: string
  images: string[]
  indigenousReservations: string[]
}

export interface Airport {
  id: number
  name: string
  iataCode: string
  oaciCode: string
  type: string
  deparmentId: number
  department: string
  cityId: number
  city: string
  latitude: number
  longitude: number
}

export interface Radio {
  id: number
  name: string
  frequency: number
  band: string
  cityId: number
  city: string
  url: string
  streamers: string[]
}

export interface Country {
  id: number
  name: string
  description: string
  stateCapital: string
  surface: number
  population: number
  languages: string[]
  timeZone: string
  currency: string
  currencyCode: string
  currencySymbol: string
  isoCode: string
  internetDomain: string
  phonePrefix: string
  radioPrefix: string
  aircraftPrefix: string
  subRegion: string
  region: string
  borders: string[]
  flags: string[]
}

export interface City {
  id: number
  name: string
  description: string
  surface: number
  population: number
  postalCode: string
  departmentId: number
  department: string
  touristAttractions: TouristAttraction2[]
  presidents: President2[]
  indigenousReservations: IndigenousReservation2[]
  airports: Airport2[]
  radios: Radio2[]
}

export interface TouristAttraction2 {
  id: number
  name: string
  description: string
  images: string[]
  latitude: string
  longitude: string
  cityId: number
  city: string
}

export interface President2 {
  id: number
  image: string
  name: string
  lastName: string
  startPeriodDate: string
  endPeriodDate: string
  politicalParty: string
  description: string
  cityId: number
  city: string
}

export interface IndigenousReservation2 {
  id: number
  name: string
  code: string
  procedureType: string
  administrativeActType: string
  administrativeActNumber: number
  administrativeActDate: string
  nativeCommunityId: number
  nativeCommunity: NativeCommunity2
  deparmentId: number
  department: string
  cityId: number
  city: string
}

export interface NativeCommunity2 {
  id: number
  name: string
  description: string
  languages: string
  images: string[]
  indigenousReservations: string[]
}

export interface Airport2 {
  id: number
  name: string
  iataCode: string
  oaciCode: string
  type: string
  deparmentId: number
  department: string
  cityId: number
  city: string
  latitude: number
  longitude: number
}

export interface Radio2 {
  id: number
  name: string
  frequency: number
  band: string
  cityId: number
  city: string
  url: string
  streamers: string[]
}

export interface NaturalArea {
  id: number
  areaGroupId: number
  categoryNaturalAreaId: number
  name: string
  departmentId: number
  daneCode: number
  landArea: number
  maritimeArea: number
  department: string
  categoryNaturalArea: CategoryNaturalArea
}

export interface CategoryNaturalArea {
  id: number
  name: string
  description: string
  naturalAreas: string[]
}

export interface Map {
  id: number
  name: string
  description: string
  departmentId: number
  urlImages: string[]
  urlSource: string
  department: string
}

export interface IndigenousReservation3 {
  id: number
  name: string
  code: string
  procedureType: string
  administrativeActType: string
  administrativeActNumber: number
  administrativeActDate: string
  nativeCommunityId: number
  nativeCommunity: NativeCommunity3
  deparmentId: number
  department: string
  cityId: number
  city: string
}

export interface NativeCommunity3 {
  id: number
  name: string
  description: string
  languages: string
  images: string[]
  indigenousReservations: string[]
}


