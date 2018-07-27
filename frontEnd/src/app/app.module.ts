import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingModule } from './modules/routing/routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LogRegComponent } from './components/log-reg/log-reg.component';

import { JwtHelper } from 'angular2-jwt';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { ListService } from './services/list.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { DahboardComponent } from './components/dahboard/dahboard.component';


@NgModule({
  declarations: [
    AppComponent,
    LogRegComponent,
    DahboardComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    JwtHelper,
    CookieService,
    AuthService,
    UserService,
    ListService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
