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
import {ActivatedRoute, ParamMap} from "@angular/router";
import "rxjs/add/operator/switchMap";

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
  amount: number;
  possibleRaiseAction: string[] = [];
  tableId;
  messages: string[] = [];


  constructor(private socketService: SocketService,
              private userService: UserService,
              private cardService: CardService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        const id = params.get('id');
        console.log(id);
        if ( id !== null) {
          this.tableId = id;
        }

        return Observable.of({});
      })
      .subscribe();

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
          console.log(content);
          let winMessage = 'A játékot ' + message.from.username + ' nyerte';

          if (content.winner[0].rank === 'mindenki bedobta' ) {
            winMessage += ', mert ' + content.winner[0].rank  ;
          } else {
            winMessage += ' ' + content.winner[0].rank + ' volt a kezében.' ;
          }
          this.messages = [...this.messages, winMessage];
          console.log('won the game', content.winner);
        } else if (content.users) {
          this.tableStatus.users = content.users;
          this.tableStatus.pot = content.pot;
          this.tableStatus.turn = content.turn;
          this.tableStatus.smallBlind = content.smallBlind;
          this.tableStatus.bigBlind = content.bigBlind;
          this.tableStatus.table = content.table;
          this.tableStatus.currentBet = content.currentBet;
          this.tableStatus.tableCards = this.getTableCards(content.tableCards);
          this.getPossibleRaiseActions(content.possibleRaiseActions);
          this.userService.getCurrentUser().subscribe( (user) => this.user = user);
          this.getUserHand(content.hand);
          this.getUserBet(content.userBets);
        } else {
        }

        if (content.message) {
          this.messages = [...this.messages, content.message];
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
    this.sendMessage(JSON.stringify({action: Action.CHECK, table: this.tableId}));
  }

  call() {
    this.sendMessage(JSON.stringify({action: Action.CALL, table: this.tableId}));
  }

  fold() {
    this.sendMessage(JSON.stringify({action: Action.FOLD, table: this.tableId}));
  }

  raise() {
    this.sendMessage(JSON.stringify({action: Action.RAISE, amount: this.amount, table: this.tableId}));
  }

  allIn() {
    this.sendMessage(JSON.stringify({action: Action.RAISE, amount: this.user.balance, table: this.tableId}));
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
    let message: any;

    if (action === Action.JOINED) {
      message = {
        action: action,
        table: this.tableId
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
  }

  getUserBet(bets ) {
    if (bets) {
      for (let i = 0; i < bets.length; i++) {
        if (bets[i].user.id === this.user.id) {
          this.userBet = bets[i].bet;
        }
      }
    }
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
    return newTableCards;
  }

  getPossibleRaiseActions(possibleRaiseActions) {
    this.possibleRaiseAction = [];
    for (let i = 0; i < possibleRaiseActions.length; i++) {
      if (possibleRaiseActions[i].user.id = this.user.id) {
        this.possibleRaiseAction = this.possibleRaiseAction.concat(possibleRaiseActions[i].actions);
      }
    }
  }

  canRaise(): boolean {
    for (let i = 0; i < this.possibleRaiseAction.length; i++) {
      if (this.possibleRaiseAction[i] === 'RAISE') {
        return true;
      }
    }
    return false;
  }


}
