import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../_models/user";
import {Observable} from "rxjs/Observable";


@Injectable()
export class UserService {

  httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
  };

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/api/v1/user', this.httpOptions);
  }

  deleteUser(id: number) {
    return this.http.delete<string>('http://localhost:3000/api/v1/user/' + id, this.httpOptions);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>('http://localhost:3000/api/v1/user/' + id,  this.httpOptions);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>('http://localhost:3000/api/v1/auth/currentUser' ,  this.httpOptions);
  }

  updateUser(id: number, user: User) {
    return this.http.put<User>('http://localhost:3000/api/v1/user/' + id, user, this.httpOptions);
  }

  addUser(user: User) {
    return this.http.post<User>('http://localhost:3000/api/v1/register', user,  this.httpOptions);
  }

}
