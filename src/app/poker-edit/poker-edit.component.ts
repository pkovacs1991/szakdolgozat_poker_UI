import { Component, OnInit } from '@angular/core';
import {TableService} from '../_service/table.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs';
import {PokerTable} from '../_models/pokertable';
import { Location } from "@angular/common";
import 'rxjs/add/operator/switchMap';
import {ErrorMessage} from "../_models/errormessage";

@Component({
  selector: 'app-poker-edit',
  templateUrl: './poker-edit.component.html',
  styleUrls: ['./poker-edit.component.css']
})
export class PokerEditComponent implements OnInit {

  table: PokerTable;
  errorMessage: ErrorMessage[] = [];
  success: boolean;
  constructor(
    private route: ActivatedRoute,
    private tableService: TableService,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        const id = params.get('id');
      console.log(id);
      if ( id !== null) {
        this.tableService.getTable(+id).subscribe(table =>  this.table = table);
      } else {
        this.table = new PokerTable();
      }
        console.log(this.table);
        return Observable.of({});
      })
      .subscribe();
  }

  async onFormSubmit(table: PokerTable) {
    this.table = table;
    if (table.id > 0) {
      console.log('form', table);
      await this.tableService.updateTable(table.id, table).subscribe(message => {
          console.log('success');
          this.success = true;
          this.errorMessage = [];
        }
      , error => {
          this.errorMessage = error.error
          this.success = false;
      }
        );
      console.log('update');
    } else {
      await this.tableService.addTable(table).subscribe(message => this.location.back()
        , error => this.errorMessage = error.error
          );
    }
  }
}
