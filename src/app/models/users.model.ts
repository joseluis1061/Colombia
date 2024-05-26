export interface Users {
  uid:             string;
  email?:           string | null;
  emailVerified:   boolean;
  isAnonymous:     boolean;
  providerData:    ProviderDatum[];
  stsTokenManager: StsTokenManager;
  createdAt:       string;
  lastLoginAt:     string;
  apiKey:          string;
  appName:         string;
}

export interface UsersExtended extends Omit<Users,
'emailVerified'|
'isAnonymous'|
'providerData'|
'stsTokenManager'|
'createdAt'|
'lastLoginAt'|
'apiKey'|
'appName'> {
  uid: string;
  email: string | null;
}

export interface ProviderDatum {
  providerId:  string;
  uid:         string;
  displayName: null;
  email:       string;
  phoneNumber: null;
  photoURL:    null;
}

export interface StsTokenManager {
  refreshToken:   string;
  accessToken:    string;
  expirationTime: number;
}
