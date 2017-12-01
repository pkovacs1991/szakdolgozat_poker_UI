import {User} from "./user";
import {PokerTable} from "./pokertable";
import {Card} from "./card";

export class TableStatus {

  smallBlind: User;
  bigBlind: User;
  currentBet: number;
  pot: number;
  turn: User;
  users: User[] = [];
  table: PokerTable;
  tableCards: Card[];
}
