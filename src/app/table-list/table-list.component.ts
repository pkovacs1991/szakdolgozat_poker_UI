import {Component, OnChanges, OnInit} from '@angular/core';
import {TableService} from '../_service/table.service';
import {PokerTable} from "../_models/pokertable";
import {MenuComponent} from "../menu/menu.component";
import {User} from "../_models/user";

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit  {

  tables: PokerTable[] = [];
  user: User;
  constructor(private tableService: TableService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.tableService.getTables().subscribe(tables => {
      this.tables = tables;
      console.log('init', tables);

    }, (error) => {
      console.log('error', error);
    });

  }


  deleteTable(id: number) {
    this.tableService.deleteTable(id).subscribe((data) => {console.log(data);
        this.tableService.getTables().subscribe(tables => {
          this.tables = tables;
        });
    },
    err => console.log('ERROR!!!'));

  }

}
