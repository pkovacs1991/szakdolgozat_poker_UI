import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {PokerTable} from '../_models/pokertable';

const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json',
      'token': localStorage.getItem('token')
    })
};


@Injectable()
export class TableService {

  constructor(private http: HttpClient) { }

  getTables(): Observable<PokerTable[]> {
    return this.http.get<PokerTable[]>('http://localhost:3000/api/v1/table', httpOptions);
  }


}
