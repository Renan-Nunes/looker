import {Component, NgIterable, signal} from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Header} from '../shared/header/header';
import {Dashboard} from '../components/dashboard/dashboard';
import {RouterOutlet} from '@angular/router';
import {Register} from '../shared/register/register';

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    FormsModule,
    Header,
    Register,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('looker');

}
