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
import {BaseRequestOptions, Http, HttpModule} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {FakeBackEndProvider} from './_helpers/fake-backend.provider';
import {LoginService} from "./_service/login-service.service";


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tables', component: TablesComponent },
  { path: 'table/:id', component: TableComponent },
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
    HttpModule
  ],
  providers: [
    LoginService,
    FakeBackEndProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
