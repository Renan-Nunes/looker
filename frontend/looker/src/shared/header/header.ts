import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from "@angular/router";
import {Login} from "../../components/login/login";
import {LoginService} from "../../services/login-service";
import {Register} from '../../components/register/register';
import {RegisterModel} from '../../models/register-model';

@Component({
  selector: 'app-header',
  imports: [
    FormsModule,
    Login,
    Register
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  menuOpen: boolean = false;
  searchQuery: string = '';


  constructor (
    private router: Router,
    private LoginService: LoginService
  ) {}

  onSearch() {
    this.router.navigate([''], {queryParams: {q: this.searchQuery}}).then(r => console.log(r));
  }

  handleLogin($event: {username: string; password: string; remember: boolean}) {
    this.LoginService.authenticate($event.username, $event.password).subscribe({
      next: (response) => {
        // @ts-ignore
        localStorage.setItem("jwt", String(response.token));
        alert('Login realizado com sucesso!');
      },
      error: (error) => {
        alert('Falha no login, tente novamente mais tarde!');
      }
    });
  }

  handleRegister($event: RegisterModel) {
    this.LoginService.register($event).subscribe({
      next: () => {
        alert('Registro Concluido!');
      },
      error: (error) => {
        alert('Falha no Registro');
      }
    });
  }
}
