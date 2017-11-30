import { Component, OnInit } from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_service/user.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs';
import { Location } from "@angular/common";
import "rxjs/add/operator/switchMap";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        const id = params.get('id');
        console.log(id);
        if ( id !== null) {
          this.userService.getUser(+id).subscribe(user =>  this.user = user);
        } else {
          this.userService.getCurrentUser().subscribe(user =>  this.user = user);
        }
        console.log(this.user);
        return Observable.of({});
      })
      .subscribe();
  }

  async onFormSubmit(user: User) {
    console.log(user);
      console.log('form', user);
      await this.userService.updateUser(user.id, user).subscribe(message => this.location.back());
      console.log('update');

  }
}
