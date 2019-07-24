import { Injectable } from '@angular/core';
import { Nachricht } from '../model/nachricht.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NachrichtenService {

  constructor(private http: HttpClient) { }

  getNachrichten(token, timestamp) {
     let headers: HttpHeaders = new HttpHeaders().set("Authorization", "Bearer " + token);
     return this.http.get(environment.server + "/messages/" + timestamp, {headers});
  }
}
