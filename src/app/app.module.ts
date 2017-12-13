import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { TableListComponent } from './table-list/table-list.component';
import { TableComponent } from './table/table.component';
import {HttpClientModule} from '@angular/common/http';
import {MockBackend} from '@angular/http/testing';
import {LoginService} from './_service/login.service';
import {FormsModule, FormControl, ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './_guards/AuthGuard';
import {RegisterService} from './_service/register.service';
import {TableService} from './_service/table.service';
import {
  MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule,
  MatFormFieldModule, MatInputModule, MatSelectModule, MatListModule,
  MatButtonToggleModule, MatTableDataSource, MatPaginator, MatPaginatorModule, MatTableModule
} from '@angular/material';
import { PokerFormComponent } from './poker-form/poker-form.component';
import { PokerEditComponent } from './poker-edit/poker-edit.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UserListComponent } from './user-list/user-list.component';
import {UserService} from './_service/user.service';
import { UserFormComponent } from './user-form/user-form.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import {SocketService} from './_service/socket.service';
import {CardService} from "./_service/card.service";
import {AdminGuard} from "./_guards/AdminGuard";
import { RoutingModule} from "./_routes/routing.module";



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    LoginComponent,
    PageNotFoundComponent,
    RegisterComponent,
    TableListComponent,
    TableComponent,
    PokerFormComponent,
    PokerEditComponent,
    UserListComponent,
    UserFormComponent,
    UserEditComponent
  ],
  imports: [
    RoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatListModule,
    MatPaginatorModule, MatTableModule, MatButtonToggleModule
  ],
  providers: [
    LoginService,
    RegisterService,
    TableService,
    UserService,
    SocketService,
    CardService,
    MockBackend,
    AuthGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
