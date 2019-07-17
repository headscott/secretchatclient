import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwort: string = "";
  username: string = "";
  favcolor: string = "";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.userService.register(this.passwort, this.username, this.favcolor).subscribe((data: any) => {
      this.userService.loginSuccessful(data);
      this.router.navigate(['/chat']);
    });
  }

}
