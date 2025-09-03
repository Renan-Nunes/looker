import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Rent {
  http: HttpClient;
  constructor(http: HttpClient) { 
    this.http = http;
  }

  getRents(filmeId: number): Observable<any[]> {
      const headers = new HttpHeaders({
        'X-User-Id': '1',
        'X-User-Role': 'USER'
      });
      // @ts-ignore
      return this.http.post(
        'http://localhost:8001/v1/alugueis/',
        { filme_id: filmeId },
        { headers }   
      );
    }
}
  
