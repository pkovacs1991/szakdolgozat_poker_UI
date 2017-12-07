import {Component, OnChanges, OnInit} from '@angular/core';
import {User} from '../_models/user';
import {LoginService} from '../_service/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnChanges {

  user:  User;

  constructor( private loginService: LoginService) {

  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this.loginService.loggedInUser.subscribe((user) => this.user = user);

  }

  ngOnChanges() {

  }

  logout () {
    this.loginService.logout();
  }

}
