import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {RegisterModel} from '../../models/register-model';

@Component({
  selector: 'app-register',
  imports: [
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  @Output() registerSubmit = new EventEmitter<RegisterModel>();

  isVisible = false;

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    cpf: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]),
    dateOfBirth: new FormControl('', Validators.required),
  });

  openModal() {
    this.isVisible = true;
    setTimeout(() => document.getElementById('username')?.focus(), 300);
  }

  closeModal() {
    this.isVisible = false;
    this.registerForm.reset();
  }

  onSubmit() {
    if (this.registerForm.valid) {

      const registerData: RegisterModel = {
        nome: this.registerForm.get('username')?.value?.toString(),
        senha: this.registerForm.get('password')?.value?.toString(),
        email: this.registerForm.get('email')?.value?.toString(),
        cpf: this.registerForm.get('cpf')?.value?.toString(),
        telefone: this.registerForm.get('phone')?.value?.toString(),
        data_nascimento: new Date(this.registerForm.get('dateOfBirth')?.value?.toString() || ''),
      };

      this.registerSubmit.emit(registerData);
      this.closeModal();
    }
  }

  onOverlayClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isVisible) {
      this.closeModal();
    }
  }
}

