export interface IUser {
  displayName: string;
}

export interface IRoom {
  id: string;
  users: IUser[];
}

export interface IAppState {
  rooms: IRoom[];
}
