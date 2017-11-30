import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {PokerTable} from '../_models/pokertable';

@Component({
  selector: 'app-poker-form',
  templateUrl: './poker-form.component.html',
  styleUrls: ['./poker-form.component.css']
})
export class PokerFormComponent implements OnChanges {

  @Input() table: PokerTable;
  model: PokerTable = null;
  @Output() onSubmit = new EventEmitter<PokerTable>();

  constructor() { }

  ngOnChanges() {
    this.model = Object.assign({}, this.table);
  }

  submit(form) {
    if (!form.valid) {
      return;
    }
    console.log(this.model);
    this.onSubmit.emit(this.model);
  }
}
