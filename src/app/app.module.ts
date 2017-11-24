import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { TablesComponent } from './tables/tables.component';
import { TableComponent } from './table/table.component';
import {HttpClientModule} from '@angular/common/http';
import {MockBackend} from '@angular/http/testing';
import {LoginService} from './_service/login.service';
import {FormsModule} from '@angular/forms';
import {AuthGuard} from './_guards/AuthGuard';
import {RegisterService} from './_service/register.service';
import {TableService} from './_service/table.service';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tables', component: TablesComponent, canActivate: [AuthGuard]  },
  { path: 'table/:id', component: TableComponent, canActivate: [AuthGuard]  },
  { path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    LoginComponent,
    PageNotFoundComponent,
    RegisterComponent,
    TablesComponent,
    TableComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true, useHash: true  } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    LoginService,
    RegisterService,
    TableService,
    MockBackend,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
