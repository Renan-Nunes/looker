import { Component, OnInit } from '@angular/core';
import { FilmeModel } from '../../models/filme-model';
import { MovieService } from '../../services/movie-service';
import { ActivatedRoute } from '@angular/router';
import { Rent } from "../../services/rent";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.html',
  styleUrls: ['./movie.css']  // <-- corrigido (styleUrls)
})
export class Movie implements OnInit {
  movie: FilmeModel | undefined;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private rentService: Rent
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.movieService.getMovie(id).subscribe(
        (data) => {
          this.movie = data as FilmeModel;
        }
      );
    });
  }


  rentMovie(): void {
    if (this.movie) {
      this.rentService.getRents(this.movie.id).subscribe(
        (data) => {

        }
      );
    }
  }
}
