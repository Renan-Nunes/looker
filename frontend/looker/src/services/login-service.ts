import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string) {
    return this.http.post('https://localhost:8080/user/api/v1/users/login', { email: username, senha: password })
  }
}
