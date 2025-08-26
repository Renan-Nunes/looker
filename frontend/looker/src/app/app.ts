import {Component, NgIterable, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatInput} from '@angular/material/input';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {FilmeModel, mockFilmes} from '../models/filme-model';
import {Header} from '../shared/header/header';
import {Dashboard} from '../components/dashboard/dashboard';
import {Movie} from '../components/movie/movie';

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatFormField,
    RouterOutlet,
    FormsModule,
    MatFormField,
    MatIcon,
    MatLabel,
    CommonModule,
    FormsModule,
    MatCardContent,
    MatCardTitle,
    MatCard,
    NgOptimizedImage,
    Header,
    Dashboard,
    Movie
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('looker');

}
