import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-register',
  imports: [
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Login {
  @Output() registerSubmit = new EventEmitter<{username: string, password: string, remember: boolean}>();

  isVisible = false;

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  openModal() {
    console.log("Abrindo modal de register");
    this.isVisible = true;
    setTimeout(() => document.getElementById('username')?.focus(), 300);
  }

  closeModal() {
    this.isVisible = false;
    this.registerForm.reset();
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // @ts-ignore
      this.loginSubmit.emit(this.registerForm.value);
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

