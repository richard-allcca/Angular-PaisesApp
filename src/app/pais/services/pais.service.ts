import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  // Crea los params que obtiene solo cosas lo necesario de la petición
  get httParams() {
    return new HttpParams().set(
      'fields',
      'name,capital,region,population,flags,cca2'
    );
  }

  constructor(private http: HttpClient) {}

  buscarPais(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${termino}`;

    return this.http.get<Country[]>(url, { params: this.httParams });
  }

  buscarCapital(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${termino}`;

    return this.http.get<Country[]>(url, { params: this.httParams });
  }

  verPaisPorId(id: string): Observable<Country[]> {
    const url = `${this.apiUrl}/alpha/${id}`;

    return this.http.get<Country[]>(url);
  }

  buscarRegion(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${termino}`;

    return this.http.get<Country[]>(`${url}`, { params: this.httParams });
  }
}
