import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders,  HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {User} from '../_models/user';
import {Router} from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LoginService {
  // headers = new Headers({
  //   'Content-Type': 'application/json'
  // });

  @Output() loggedInUser: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient) {


  }

   login(user: User): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/v1/auth/login', user, httpOptions);
   }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.loggedInUser.emit( null);
  }
}

