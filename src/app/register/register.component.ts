import { Component, OnInit } from '@angular/core';
import {User} from '../_models/user';
import {RegisterService} from '../_service/register.service';
import {Router} from '@angular/router';
import {ErrorMessage} from "../_models/errormessage";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  password2: string;
  errorMessage: ErrorMessage[] = [];
  success: boolean;
  constructor( private registerService: RegisterService, private router: Router) {
    this.user = new User();

  }

  ngOnInit() {
  }

  async onFormSubmit(user: User) {
    this.user = user;
    this.registerService.register(user).subscribe(
      (data) => {console.log(data);
        this.errorMessage = [];
        this.success = false;
        this.router.navigate(['login']);
      },
      err => {
        this.success = false;
        this.errorMessage = err.error;
      }
    );
  }

}
