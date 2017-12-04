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
        this.loginService.loggedInUser.emit(data.user);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        localStorage.setItem('currentUserId', data.user.id);
        localStorage.setItem('token', data.token);
        console.log(localStorage.getItem('currentUser'));
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
