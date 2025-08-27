import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FilmeModel} from '../models/filme-model';

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  constructor(private http: HttpClient) {
    this.http = http;
  }

  getMovies(name: string): Observable<FilmeModel[]> {
    // @ts-ignore
    return this.http.get(`http://localhost:8000/movies/v1/filmes/search/${name}`);
  }

  getMovie(id: number) {
    return this.http.get(`http://localhost:8000/v1/filmes/${id}` );
  }

  getAllMovies(): Observable<FilmeModel[]> {
    const url = 'http://localhost:8000/v1/filmes/';
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    };

    return this.http.get<FilmeModel[]>(url, { headers });
  }
}
