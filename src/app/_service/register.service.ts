import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders,  HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../_models/user';


@Injectable()
export class RegisterService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/api/v1/auth/register', user, this.httpOptions);
  }

}
