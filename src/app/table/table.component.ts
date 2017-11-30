import { Component, OnInit } from '@angular/core';
import {Action} from "../_models/action";
import {Message} from "../_models/message";
import {User} from "../_models/user";
import {SocketService} from "../_service/socket.service";
import {UserService} from "../_service/user.service";
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import {TableStatus} from "../_models/tablestatus";
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

  constructor(private socketService: SocketService,
              private userService: UserService) { }

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
        if (content.users) {
          this.tableStatus.users = content.users;
          this.tableStatus.pot = content.pot;
          this.tableStatus.turn = content.turn;
          this.tableStatus.smallBlind = content.smallBlind;
          this.tableStatus.bigBlind = content.bigBlind;
          this.tableStatus.table = content.table;
          this.tableStatus.currentBet = content.currentBet;
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
    this.sendMessage(JSON.stringify({action: Action.RAISE}));
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

}
