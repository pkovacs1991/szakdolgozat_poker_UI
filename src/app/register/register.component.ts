import { Component, OnInit } from '@angular/core';
import {User} from '../_models/user';
import {RegisterService} from '../_service/register.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  password2: string;
  constructor( private registerService: RegisterService, private router: Router) {
    this.user = new User();

  }

  ngOnInit() {
    this.user = new User();

  }

  async onFormSubmit(user: User) {
    console.log(user);
    this.registerService.register(user).subscribe(
      (data) => {console.log(data);
        this.router.navigate(['login']);
      },
      err => console.log('ERROR!!!')
    );
  }

}
