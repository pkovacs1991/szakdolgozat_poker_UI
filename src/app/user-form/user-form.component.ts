import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {User} from "../_models/user";
import {UserService} from "../_service/user.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnChanges {

  @Input() user: User;
  model: User = null;
  loggedInUser: User;
  @Output() onSubmit = new EventEmitter<User>();

  constructor(private userService: UserService) {
    this.loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnChanges() {
    this.model = Object.assign({}, this.user);
    console.log(this.model);
  }

  resetBalance() {
    console.log('called');
    this.userService.resetBalance().subscribe( next => {
      this.userService.getCurrentUser().subscribe(user =>  this.model = user);
      }
    );

  }

  submit(form) {
    if (!form.valid) {
      return;
    }
    console.log(this.model);
    this.onSubmit.emit(this.model);
  }
}
