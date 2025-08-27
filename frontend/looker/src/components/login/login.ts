import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {CommonModule, NgIf} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    CommonModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    NgIf,
    MatFormField,
    ReactiveFormsModule,
    MatIcon,
    MatLabel,
    MatError,
    MatInputModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.onSendLogin.emit(this.form.value);
    }
  }

  @Output() onSendLogin = new EventEmitter();
}
