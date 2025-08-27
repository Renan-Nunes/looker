import {Component, OnInit} from '@angular/core';
import {FilmeModel} from '../../models/filme-model';
import {MovieService} from '../../services/movie-service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-movie',
  imports: [],
  templateUrl: './movie.html',
  styleUrl: './movie.css'
})
export class Movie implements OnInit {
  movie: FilmeModel | undefined;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.movieService.getMovie(id).subscribe(
        (data) => {
          this.movie = (data) as FilmeModel;
          console.log(this.movie);
        }
      );
    });
  }
}
