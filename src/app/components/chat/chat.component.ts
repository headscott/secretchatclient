import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NachrichtenService } from '../../services/nachrichten.service';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { Nachricht } from '../../model/nachricht.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  nachrichten: Nachricht[] = [];

  eigeneruser: string = "";
  eigenefarbe: string = "red";
  nachricht: string = "";

  heartbeat: number = 0;

  socket: Subject<any>;

  @ViewChild('chatfenster', {read: ElementRef, static: false}) chatFensterRef: ElementRef;

  constructor(private userService: UserService, private nachrichtenService: NachrichtenService, private router: Router, private websocketService: WebsocketService) { }

  ngOnInit() {
     if(!this.userService.getUser().username) {
        this.router.navigate(['/login']);
     } else {
       this.eigeneruser = this.userService.getUser().username;
       this.eigenefarbe = this.userService.getUser().favcolor;

       this.socket = this.websocketService.createWebsocket();

       this.websocketService.getSocketConnected().subscribe(() => {
         console.log("Die Websocket-Verbindung zum Server wurde aufgebaut");
         this.socket.next({
           command: "login",
           payload: this.eigeneruser
         })
          this.socket.subscribe(message => {
            let msg = JSON.parse(message.data);
            console.dir(msg);
            this.nachrichten.push(msg.payload);
          }, error => {
            console.log("FEHLER IM WEBSOCKET");
          }, () => {
            console.log("WEBSOCKET WURDE GESCHLOSSEN");
            window.setTimeout(() => this.socket = this.websocketService.createWebsocket(), 1000);
          });

          if(this.heartbeat)
            window.clearInterval(this.heartbeat);
          this.heartbeat = window.setInterval(() => this.socket.next({command: "heartbeat", payload: 0}), 30000);

          // Hole entgangene Nachrichten, falls notwendig. Alles, was nach dem timestamp der letzten Nachricht liegt
          if(this.nachrichten.length) {
            this.nachrichtenService.getNachrichten(this.nachrichten[this.nachrichten.length-1].timestamp).subscribe((nachrichten: any) => {
              if(nachrichten.length)
                this.nachrichten = [...this.nachrichten, ...nachrichten];
            });
          }

       })

      this.nachrichtenService.getNachrichten(this.userService.getUser().timestamp).subscribe((nachrichten: any) => {
        this.nachrichten = nachrichten;
      });

     }
  }

  ngAfterViewChecked() {
    this.chatFensterRef.nativeElement.scrollTop = this.chatFensterRef.nativeElement.scrollHeight;
  }

  sendMessage() {
    if(this.nachricht) {
      this.socket.next({
        command: "message",
        payload: {
          username: this.eigeneruser,
          nachricht: this.nachricht,
          color: this.eigenefarbe
        }
      })
      this.nachricht = "";
    }
  }

}
