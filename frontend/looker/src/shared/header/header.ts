import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from "@angular/router";
import {Login} from "../../components/login/login";
import {LoginService} from "../../services/login-service";

@Component({
  selector: 'app-header',
  imports: [
    FormsModule,
    Login
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  menuOpen: any;
  router: any;
  searchQuery: string = '';
  loginService: LoginService;


  constructor (Router: Router, private LoginService: LoginService) {
    this.menuOpen = false;
    this.router = Router;
    this.loginService = LoginService;
  }

  onSearch() {
    this.router.navigate([''], { queryParams: { q: this.searchQuery } });
  }

  handleLogin($event: {username: string; password: string; remember: boolean}) {
    this.LoginService.authenticate($event.username, $event.password).subscribe({
      next: (response) => {
        localStorage.setItem("jwt", String(response));
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}
