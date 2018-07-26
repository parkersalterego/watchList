import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { JwtHelper } from 'angular2-jwt';
import { CookieService } from 'angular2-cookie/services/cookies.service';



@Component({
  selector: 'app-log-reg',
  templateUrl: './log-reg.component.html',
  styleUrls: ['./log-reg.component.scss']
})
export class LogRegComponent implements OnInit {
  // if true login if fals Register
  logRegSelector = true;

  constructor(
              private userService: UserService,
              private authService: AuthService,
              private jwtHelper: JwtHelper,
              private cookieService: CookieService ,
              private router: Router,
  ) { }

  ngOnInit() {
  }

  onLogRegSubmit(f) {
    const form = f.value;

    this.logRegSelector
      ? this.loginUser({
        email: form.email,
        password: form.password
      })
      : this.registerUser({
        username: form.username,
        email: form.email,
        password: form.password
      });
  }

  loginUser(user) {
    this.authService.loginUser(user)
      .subscribe(data => {
        if (data.error) {
          // @TODO flash message
          console.log('an error occured');
        } else {
          this.cookieService.put('authToken', JSON.stringify(data.accessToken));
          this.userService.getUserById()
            .subscribe(userObj => {
              console.log(userObj);
              this.userService.user = userObj;
              this.router.navigate(['/dashboard']);
            });
        }
      });
  }

  registerUser(user) {
    this.authService.registerUser(user)
      .subscribe(data => {
        console.log(data);
      });
  }

}
