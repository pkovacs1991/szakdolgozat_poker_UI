import { Component, OnInit } from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_service/user.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs';
import { Location } from "@angular/common";
import "rxjs/add/operator/switchMap";
import {ErrorMessage} from "../_models/errormessage";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User;
  errorMessage: ErrorMessage[] = [];
  success: boolean;
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

  onFormSubmit(user: User) {
    this.user = user;
      this.userService.updateUser(user.id, user).subscribe(message => {
         console.log('success');
         this.success = true;
         this.errorMessage = [];
        }
      , (error) => {
          this.success = false;
          console.log(error);
          this.errorMessage = error.error;
        }
      );

  }
}
