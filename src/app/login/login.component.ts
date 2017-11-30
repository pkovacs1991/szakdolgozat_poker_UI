import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from '../_service/login.service';
import {User} from '../_models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor(
      private loginService: LoginService, private router: Router
  )
    {
      if (localStorage.getItem('currentUser')) {
        router.navigate(['tables']);
      } else {
        this.user = new User();
      }
    }

  ngOnInit() {
  }


  login() {
    this.loginService.login(this.user).subscribe(
      (data) => {
        console.log(data);
        localStorage.setItem('currentUser', data.user.username);
        localStorage.setItem('currentUserId', data.user.id);
        localStorage.setItem('token', data.token);
        console.log(localStorage.getItem('currentUser'));
        this.loginService.loggedInUser.emit(data);
      },
      err => console.log('ERROR!!!'),
      () => {

          console.log('Got response from API');
          if (localStorage.getItem('currentUser')) {
            this.router.navigate(['tables']);
          }
        }
    );




  }


}
