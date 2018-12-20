export enum Status {
  Online = 'Online',
  Offline = 'Offline',
  Busy = 'Busy',
  AppearOffline = 'AppearOffline',
  Away = 'Away'
}
export interface User {
  uid: string,
  name?: string;
  age?: number;
  email: string;
  nick?: string;
  active?: boolean;
  status?: Status;
}
