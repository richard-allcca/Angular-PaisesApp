import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';

// NOTE - Inportant!
// Para este servicio HttpClient es necesario tenerlo importado el modulo en app.module.ts

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) { }

  searchByAlphaCode(code: string): Observable<Country | null> {

    // https://restcountries.com/v3.1/alpha/col
    const url = `${this.apiUrl}/alpha/${code}`
    return this.httpClient.get<Country[]>(url)
    .pipe(
      map(countries => countries.length > 0 ? countries[0] : null),
      catchError(error => of(null))
    )
  }



  searchCapital(term: string): Observable<Country[]> {

    const url = `${this.apiUrl}/capital/${term}`;

    return this.httpClient.get<Country[]>(url)
    .pipe(
      catchError(error => of([]) )
    )
  }

  searchCountry(term: string): Observable<Country[]> {

    // https://restcountries.com/v3.1/name/aruba
    const url = `${this.apiUrl}/name/${term}`;

    return this.httpClient.get<Country[]>(url)
    .pipe(
      catchError(error => of([]) )
    )
  }

  searchRegion(term: string): Observable<Country[]> {

    // https://restcountries.com/v3.1/region/europe
    const url = `${this.apiUrl}/region/${term}`;

    return this.httpClient.get<Country[]>(url)
    .pipe(
      catchError(error => of([]) )
    )
  }

}