import { Component, OnInit } from '@angular/core';
import {TableService} from '../_service/table.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  tables = [];

  constructor(private tableService: TableService) { }

  ngOnInit() {

    this.tableService.getTables().subscribe(tables => {
      this.tables = tables;
    });
  }

}
