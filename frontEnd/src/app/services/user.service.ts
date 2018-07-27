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
export class UserService {
  user: User;

  constructor(
              private http: Http,
              private jwtHelper: JwtHelper,
              private cookieService: CookieService
  ) { }

  getUserById() {
    const headers = new Headers();
    const token = this.cookieService.get('authToken');
    const id = this.jwtHelper.decodeToken(token).id;
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${token.split('"')[1]}`);
    return this.http.get(`${environment.api}/users/${id}`, {headers : headers})
      .pipe(map(res => res.json()));
  }

}


