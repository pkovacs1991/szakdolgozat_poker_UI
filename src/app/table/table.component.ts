import { Component, OnInit } from '@angular/core';
import {Action} from '../_models/action';
import {Message} from '../_models/message';
import {User} from '../_models/user';
import {SocketService} from '../_service/socket.service';
import {UserService} from '../_service/user.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {TableStatus} from '../_models/tablestatus';
import {Card} from '../_models/card';
import {CardService} from "../_service/card.service";
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  action = Action;
  user: User;
  ioConnection: any;
  tableStatus = new TableStatus();
  hand: Card[] = [];
  userBet: number;

  constructor(private socketService: SocketService,
              private userService: UserService,
              private cardService: CardService) { }

  ngOnInit(): void {
    this.initModel().subscribe( next => {
      // Using timeout due to https://github.com/angular/angular/issues/14748
      setTimeout(() => {
        this.initIoConnection();
        this.sendNotification(Action.JOINED);
      }, 0);
    });
  }

  private initModel(): any {
    return this.userService.getCurrentUser().map((user) => {
      this.user = user;
      return Observable.of();
    });
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        console.log(message);
        const content = JSON.parse(message.content);
        console.log(content.status);
        if (content.winner) {
          console.log('won the game yay', content.winner);
        } else if (content.users) {
          this.tableStatus.users = content.users;
          this.tableStatus.pot = content.pot;
          this.tableStatus.turn = content.turn;
          this.tableStatus.smallBlind = content.smallBlind;
          this.tableStatus.bigBlind = content.bigBlind;
          this.tableStatus.table = content.table;
          this.tableStatus.currentBet = content.currentBet;
          this.tableStatus.tableCards = this.getTableCards(content.tableCards);
          this.getUserHand(content.hand);
          this.getUserBet(content.userBets);
          console.log(message);
        } else {
        }
      });

    this.socketService.onConnect()
      .subscribe(() => {
        console.log('onConnect');
      });

    this.socketService.onDisconnect()
      .subscribe(() => {
        console.log('onDisconnect');
      });
  }

  check() {
    // this.sendMessage(JSON.stringify({action: Action.CHECK}));
  }

  call() {
    // this.sendMessage(JSON.stringify({action: Action.CALL}));
  }

  fold() {
    this.sendMessage(JSON.stringify({action: Action.FOLD}));
  }

  raise() {
    // this.sendMessage(JSON.stringify({action: Action.RAISE}));
  }

  allIn() {
    // this.sendMessage(JSON.stringify({action: Action.ALL_IN}));
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.socketService.send({
      from: this.user,
      content: message
    });
  }

  public sendNotification( action: Action): void {
    let message: Message;

    if (action === Action.JOINED) {
      message = {
        action: action
      };
    }
    this.sendMessage(JSON.stringify(message));
  }

  public isSmallBlind (user: User): boolean {
    return user.id === this.tableStatus.smallBlind.id;
  }

  public isBigBlind (user: User): boolean {
    return user.id === this.tableStatus.bigBlind.id;
  }

  myTurn() {
    return this.tableStatus.turn && this.tableStatus.turn.id === this.user.id;
  }

  getUserHand(hand ) {
    this.hand = [];
    for (let i = 0; i < hand.length; i++) {
      if (hand[i].user.id === this.user.id) {
        const card1 = new Card();
        const card2 = new Card();
        card1.number = hand[i].cards[0].number;
        card1.color = hand[i].cards[0].color;
        card1.htmlFigure = this.cardService.getHtmlFigure(card1.color);
        card1.htmlColor = this.cardService.getCardColor(card1.color);
        card2.number = hand[i].cards[1].number;
        card2.color = hand[i].cards[1].color;
        card2.htmlFigure = this.cardService.getHtmlFigure(card2.color);
        card2.htmlColor = this.cardService.getCardColor(card2.color);
        this.hand.push(card1);
        this.hand.push(card2);
      }
    }
    console.log('aaaaaaaaaa', this.hand);
  }

  getUserBet(bets ) {
    for (let i = 0; i < bets.length; i++) {
      if (bets[i].user.id === this.user.id) {
        this.userBet = bets[i].bet;
      }
    }
    console.log('betttttt', this.userBet);
    console.log('currrbetttttt', this.tableStatus.currentBet);
  }

  getTableCards(tableCards ) {
    const newTableCards = [];
    if (tableCards) {
      for (let i = 0; i < tableCards.length; i++) {
        const card = new Card();
        card.number = tableCards[i].number;
        card.color = tableCards[i].color;
        card.htmlFigure = this.cardService.getHtmlFigure(card.color);
        card.htmlColor = this.cardService.getCardColor(card.color);
        newTableCards.push(card);
      }
    }
    console.log('aaaaaaaaaa', newTableCards);
    return newTableCards;
  }

}
