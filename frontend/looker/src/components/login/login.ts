import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {CommonModule, NgIf} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  @Output() loginSubmit = new EventEmitter<{username: string, password: string, remember: boolean}>();

  isVisible = false;
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    remember: new FormControl(false)
  });

  openModal() {
    this.isVisible = true;
    setTimeout(() => document.getElementById('username')?.focus(), 300);
  }

  closeModal() {
    this.isVisible = false;
    this.loginForm.reset();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // @ts-ignore
      this.loginSubmit.emit(this.loginForm.value);
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

