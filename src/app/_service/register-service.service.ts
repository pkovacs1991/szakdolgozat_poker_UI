import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders,  HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {User} from '../_models/user';
import {Router} from '@angular/router';


@Injectable()
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    const headers      = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('register');
    return this.http.post('http://localhost:3000/api/v1/auth/register', JSON.stringify(user), { headers: headers })
      .map((data: HttpResponse<any>) => data)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
