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
