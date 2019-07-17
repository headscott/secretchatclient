import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ColorPickerModule } from 'ngx-color-picker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { UserService } from './services/user.service';
import { NachrichtenService } from './services/nachrichten.service';
import { WebsocketService } from './services/websocket.service';

import { ChatComponent } from './components/chat/chat.component';

import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ColorPickerModule
  ],
  providers: [UserService, NachrichtenService, WebsocketService, { provide: LOCALE_ID, useValue: "de-DE" }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
