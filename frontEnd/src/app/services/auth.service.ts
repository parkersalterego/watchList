import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { environment } from '../../environments/environment';

import { User } from '../models/user';
import { JwtHelper } from 'angular2-jwt';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
              private http: Http,
              private jwtHelper: JwtHelper,
              private cookieService: CookieService
  ) { }

  registerUser(user: User) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${environment.api}/users/register`, user, {headers: headers})
      .pipe(map(res => res.json()));
  }

  loginUser(user: User) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${environment.api}/users/login`, user, {headers: headers})
      .pipe(map(res => res.json()));
  }
}
