import {EventEmitter, Injectable, Output} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {User} from '../_models/user';
import {Router} from '@angular/router';

@Injectable()
export class LoginService {
  headers = new Headers({
    'Content-Type': 'application/json'
  });

  @Output() loggedInUser: EventEmitter<any> = new EventEmitter();
  constructor(private http: Http, private router: Router) {
    console.log(localStorage.getItem('currentUser'));
    this.loggedInUser.emit(localStorage.getItem('currentUser'));
  }

   login(user: User) {
    console.log('login');

    return this.http.post('http://localhost:3000/api/v1/auth/login', JSON.stringify(user), {headers: this.headers})
      .map((res: Response) => res.json()).subscribe(
        data => {
          console.log(data);
          localStorage.setItem('currentUser', data);
          console.log(localStorage.getItem('currentUser'));
          this.router.navigate(['tables']);
          this.loggedInUser.emit(data);
        },
        err => console.error(err),
        );
   }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.loggedInUser.emit( null);
  }
}

