import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {FilmeModel} from '../../models/filme-model';
import {MovieService} from '../../services/movie-service'
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, Subscription} from 'rxjs';

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
  subscriptions = new Subscription();

  constructor(private movieService: MovieService, private router: Router, private route: ActivatedRoute) {
    this.movieService = movieService;
  }

  ngOnInit(): void {
    console.log("Dashboard inicializado");
    this.loadMovies();

    this.subscriptions.add(
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
          this.loadMovies();
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadMovies(): void {
    this.movieService.getAllMovies().subscribe((data: FilmeModel[]) => {
      const query = this.route.snapshot.queryParams['q'];
      if (query) {
        this.movies = data.filter(movie =>
            movie.titulo.toLowerCase().includes(query.toLowerCase())
        );
      } else {
        this.movies = data;
      }
    });
  }

  openMovieInfo(id: number) {ccccccs
    this.router.navigate([`/movie/${id}`]);
  }
}

