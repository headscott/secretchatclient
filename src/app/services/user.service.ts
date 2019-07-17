import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User = {};

  constructor(private http: HttpClient) { }

  getUser() {
    return this.user;
  }

  register(loginkey, username, favcolor) {
    return this.http.post(environment.server + "/register", {loginkey: loginkey, username: username, favcolor: favcolor});
  }

  login(loginkey) {
    return this.http.post(environment.server + "/login", {loginkey: loginkey});
  }

  loginSuccessful(userdata) {
    this.user = userdata;
  }
}
