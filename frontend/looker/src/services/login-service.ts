import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterModel} from '../models/register-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string) {
    return this.http.post('http://localhost:8080/user/api/v1/users/login', { email: username, senha: password })
  }

  register(data: RegisterModel) {
    return this.http.post(
      'http://localhost:8080/user/api/v1/users',
      {
        nome: data.nome,
        cpf: data.cpf,
        email: data.email,
        senha: data.senha,
        telefone: data.telefone,
        data_nascimento: data.data_nascimento,
        role: "user"
      }
    )
  }
}
