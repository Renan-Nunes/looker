import {Component, OnInit} from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {FilmeModel, mockFilmes} from '../../models/filme-model';
import {MovieService} from '../../services/movie-service'

@Component({
  selector: 'app-dashboard',
    imports: [
        NgForOf
    ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  movies: FilmeModel[] = mockFilmes;

  constructor(private movieService: MovieService) {
    this.movieService = movieService;
  }

  ngOnInit(): void {
    this.movieService.getMovies('a').subscribe((data: FilmeModel[]) => {
      const filtrados: FilmeModel[] = [];

      while (filtrados.length < 20) ; {
        const randomIndex = Math.floor(Math.random() * data.length);
        const movie = data[randomIndex];
        if (!filtrados.includes(movie)) {
          filtrados.push(movie);
        }
      }

      this.movies = filtrados;
    });
  }

}

