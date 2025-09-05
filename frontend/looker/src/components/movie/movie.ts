import { Component, OnInit } from '@angular/core';
import { FilmeModel } from '../../models/filme-model';
import { MovieService } from '../../services/movie-service';
import { ActivatedRoute } from '@angular/router';
import { Rent } from "../../services/rent";
import {  ElementRef, ViewChild } from '@angular/core';
  
@Component({
  selector: 'app-movie',
  templateUrl: './movie.html',
  styleUrls: ['./movie.css']  
})
export class Movie implements OnInit {
  @ViewChild('button') button!: ElementRef<HTMLButtonElement>;
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
      this.button.nativeElement.disabled = true;

      this.rentService.getRents(this.movie.id).subscribe(
        (data) => {
          console.log('Rent successful:', data);
          // @ts-ignore  
          const iso = data.aluguel.data_prevista_devolucao.replace(/(\.\d{3})\d+/, "$1");
          // @ts-ignore
          alert('Aluguel realizado com sucesso!! ' + 'Codigo do aluguel: ' + data.pagamento.aluguel_id + ' valor: ' + data.pagamento.amount);
          // @ts-ignore
          alert('Previsao de devolucao: ' + new Date(iso));
        },
        (error) => { 
            if (error.status === 401) {
              alert('Usuario não autenticado');
              return;
            }

            alert('Aluguel não realizado, tente novamente mais tarde');
        },
        () => {
          this.button.nativeElement.disabled = false;
        }
      );
    }
  }
}
