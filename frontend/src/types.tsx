export type PlayerType = 'spectator' | 'player';

export interface IUser {
  id?: string;
  displayName: string;
  type: PlayerType;
  connected: boolean;
  hasCardSelected: boolean;
}

export interface IRevealedCard {
  userId: string;
  selectedCard: string;
}

export interface IRoom {
  id: string;
  cards: string[];
}

export interface IClientRoom extends IRoom{
  users: IUser[];
}

export interface ICreateRoomData {
  cards: string[]
}

export interface IJoinRoomData {
  roomId: string;
  clientId: string;
  displayName: string;
  playerType: PlayerType;
}

export interface IPlayCardData {
  roomId: string;
  card: string;
}

export interface IClearCardData {
  roomId: string;
}
