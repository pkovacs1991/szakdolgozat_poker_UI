import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";
import {AdminGuard} from "../_guards/AdminGuard";
import {AuthGuard} from "../_guards/AuthGuard";
import {UserListComponent} from "../user-list/user-list.component";
import {UserEditComponent} from "../user-edit/user-edit.component";
import {TableComponent} from "../table/table.component";
import {PokerEditComponent} from "../poker-edit/poker-edit.component";
import {TableListComponent} from "../table-list/table-list.component";
import {RegisterComponent} from "../register/register.component";
import {LoginComponent} from "../login/login.component";


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tables', component: TableListComponent, canActivate: [AuthGuard]  },
  { path: 'table/new', component: PokerEditComponent, canActivate: [AuthGuard, AdminGuard]  },
  { path: 'table/edit/:id', component: PokerEditComponent, canActivate: [AuthGuard, AdminGuard]  },
  { path: 'table/:id', component: TableComponent, canActivate: [AuthGuard]  },
  { path: 'profile', component: UserEditComponent, canActivate: [AuthGuard]  },
  { path: 'user/edit/:id', component: UserEditComponent, canActivate: [AuthGuard, AdminGuard]  },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard, AdminGuard]  },
  { path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: '**',
    redirectTo: 'login',
    pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(
    appRoutes)  ],
  exports: [ RouterModule ],
  declarations: []
})
export class RoutingModule  { }
