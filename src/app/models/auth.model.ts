export interface IUserAuth {
  userUid: string;
  name: String;
  email: string;
  password: String;
  phone: string;
  identificacion: String;
  preferenties: String[];
  role: string;
  statusActive: true;
}

export interface IUserAuthPartial extends Partial<IUserAuth>{}

export interface IUserAuthOmit extends Omit<IUserAuth, "name" | "password" | "identificacion" | "preferenties">{}
