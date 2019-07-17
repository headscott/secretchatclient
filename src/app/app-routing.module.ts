import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [{
   path: 'login',
   component: LoginComponent
},{
   path: 'register',
   component: RegisterComponent
},{
   path: 'chat',
   component: ChatComponent
},{
   path: '',
   redirectTo: '/login',
   pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
