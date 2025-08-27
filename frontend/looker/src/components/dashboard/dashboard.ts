import {Component, OnInit} from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {FilmeModel} from '../../models/filme-model';
import {MovieService} from '../../services/movie-service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
    imports: [
        NgForOf
    ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  movies: FilmeModel[] | undefined;

  constructor(private movieService: MovieService, private router: Router) {
    this.movieService = movieService;
  }

  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe((data: FilmeModel[]) => {
      this.movies = data;
      console.log(this.movies);
    });
  }

  openMovieInfo(id: number) {
    this.router.navigate([`/movie/${id}`]);
  }
}

