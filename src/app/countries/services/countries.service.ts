import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';

// NOTE - Inportant! HttpClient para este servicio es necesario tenerlo importado su modulo en app.module.ts

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) { }

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