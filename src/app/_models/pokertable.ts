import {User} from "./user";

export class PokerTable {

  id: number;

  name: string;

  minBid: number;

  maxBid: number;

  actualBid: number;

  users: User[];
}
