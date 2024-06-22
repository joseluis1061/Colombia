export interface IService{
  serviceUid: String;
  nameService: string;
  typeService: string;
  statusActive: true;
  place: String;
  price: Number;
  duration: Number;
  aviable: String[];
  description: String;
  images: String[];
}

export interface IServicePartial extends Partial<IService>{}

export interface IServiceOmit extends Omit<IService, "serviceUid" |   "place" | "price" | "duration" | "aviable" | "description" | "images">{}
