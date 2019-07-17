import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService{

   private _socketConnected = new Subject<void>();
   public readonly socketConnected = this._socketConnected.asObservable();

  public createWebsocket(): Subject<MessageEvent> {
        let socket = new WebSocket(environment.wsserver);
        socket.onopen = () => {
           this._socketConnected.next();
        };
        let observable = Observable.create(
                    (observer: Observer<MessageEvent>) => {
                        socket.onmessage = observer.next.bind(observer);
                        socket.onerror = observer.error.bind(observer);
                        socket.onclose = observer.complete.bind(observer);
                        return socket.close.bind(socket);
                    }
        );
        let observer = {
                next: (data: Object) => {
                  if (socket.readyState === WebSocket.OPEN) {
                     socket.send(JSON.stringify(data));
                  }
                }
        };
        return Subject.create(observer, observable);
  }

  public getSocketConnected() {
     return this.socketConnected;
  }
}