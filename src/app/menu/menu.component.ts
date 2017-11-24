import { Component, OnInit } from '@angular/core';
import {User} from '../_models/user';
import {LoginService} from '../_service/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user:  User;

  constructor( private loginService: LoginService) {
    this.user = loginService.loggedInUser.subscribe(user => this.user = user);

  }

  ngOnInit() {
  }

  logout () {
    this.loginService.logout();
  }

}
