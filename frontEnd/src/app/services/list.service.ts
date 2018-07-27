import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { environment } from '../../environments/environment';

import { JwtHelper } from 'angular2-jwt';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
              private http: Http,
              private jwtHelper: JwtHelper,
              private cookieService: CookieService
  ) { }

  createList(title) {
    const headers = new Headers();
    const token = this.cookieService.get('authToken');
    const id = this.jwtHelper.decodeToken(token).id;

    const list = {
      id: id,
      list: {
        title: title
      }
    };

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${token.split('"')[1]}`);
    return this.http.post(`${environment.api}/lists`, list, {headers : headers})
      .pipe(map(res => res.json()));
  }

  deleteList(id) {
    const headers = new Headers();
    const token = this.cookieService.get('authToken');
    const userId = this.jwtHelper.decodeToken(token).id;

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${token.split('"')[1]}`);
    return this.http.delete(`${environment.api}/lists/${id}`, {headers : headers})
      .pipe(map(res => res.json()));
  }

  updateUserLists(l) {
    const headers = new Headers();
    const token = this.cookieService.get('authToken');
    const id = this.jwtHelper.decodeToken(token).id;

    const lists = {
      lists: l,
      id: id
    };

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${token.split('"')[1]}`);
    return this.http.put(`${environment.api}/lists/user`, lists, {headers : headers})
      .pipe(map(res => res.json()));
  }
}
