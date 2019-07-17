import { Injectable } from '@angular/core';
import { Nachricht } from '../model/nachricht.model';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NachrichtenService {

  constructor(private http: HttpClient) { }

  getNachrichten(timestamp) {
     return this.http.get(environment.server + "/messages/" + timestamp);
  }
}
