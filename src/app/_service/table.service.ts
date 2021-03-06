'use strict';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {PokerTable} from '../_models/pokertable';


@Injectable()
export class TableService {

  httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json'

      })
  };



  constructor(private http: HttpClient) { }

  getTables(): Observable<PokerTable[]> {
    this.httpOptions.headers = this.httpOptions.headers.set('token', localStorage.getItem('token'));
    return this.http.get<PokerTable[]>('http://localhost:3000/api/v1/table', this.httpOptions);
  }

  deleteTable(id: number) {
    this.httpOptions.headers = this.httpOptions.headers.set('token', localStorage.getItem('token'));
    return this.http.delete<string>('http://localhost:3000/api/v1/table/' + id, this.httpOptions);
  }

  getTable(id: number): Observable<PokerTable> {
    this.httpOptions.headers = this.httpOptions.headers.set('token', localStorage.getItem('token'));
    return this.http.get<PokerTable>('http://localhost:3000/api/v1/table/' + id,  this.httpOptions);
  }

  updateTable(id: number, table: PokerTable) {
    this.httpOptions.headers = this.httpOptions.headers.set('token', localStorage.getItem('token'));
    return this.http.put<PokerTable>('http://localhost:3000/api/v1/table/' + id, table, this.httpOptions);
  }

  addTable(table: PokerTable) {
    this.httpOptions.headers = this.httpOptions.headers.set('token', localStorage.getItem('token'));
    return this.http.post<PokerTable>('http://localhost:3000/api/v1/table', table,  this.httpOptions);
  }

}
