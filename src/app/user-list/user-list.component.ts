import {AfterViewInit, Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {User} from '../_models/user';
import {UserService} from "../_service/user.service";
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements AfterViewInit, OnInit {

  users: User[];
  displayedColumns = ['position', 'username', 'name', 'email', 'balance', 'edit'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService) {

  }

  async ngOnInit() {



  }


  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  async ngAfterViewInit() {
    await this.userService.getUsers().subscribe(users => {
      this.users = users;
      console.log('init', users);
      this.dataSource.data = users;
      this.dataSource.paginator = this.paginator;
    });
    console.log('aa',this.users);
  }



  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((data) => {console.log(data);
        this.userService.getUsers().subscribe(users => {
          this.dataSource.data = users;
        });
      },
      err => console.log('ERROR!!!'));

  }
}
