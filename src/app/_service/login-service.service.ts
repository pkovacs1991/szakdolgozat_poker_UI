import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders,  HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {User} from '../_models/user';
import {Router} from '@angular/router';

@Injectable()
export class LoginService {
  // headers = new Headers({
  //   'Content-Type': 'application/json'
  // });

  @Output() loggedInUser: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient) {


  }

   login(user: User): Observable<any> {
    const headers      = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('login');
    return this.http.post('http://localhost:3000/api/v1/auth/login', JSON.stringify(user), { headers: headers })
      .map((data: HttpResponse<any>) => data)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }

  logout() {
    localStorage.removeItem('currentUser');
    this.loggedInUser.emit( null);
  }
}

