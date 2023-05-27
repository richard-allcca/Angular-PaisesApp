import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

// NOTE - Inportant!
// Para este servicio HttpClient es necesario tenerlo importado el modulo en app.module.ts
// LOCALSTORAGE - para cargarlo se hace desde el CONSTRUCTOR

type Pages = 'byCapital' | 'byCountry' | 'byRegion';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest = (url: string): Observable<Country[]> => {

    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(error => of([]))
      );
  };

  searchByAlphaCode(code: string): Observable<Country | null> {

    // https://restcountries.com/v3.1/alpha/col
    const url = `${this.apiUrl}/alpha/${code}`;

    return this.httpClient.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(error => of(null))
      );
  }

  searchCapital(term: string): Observable<Country[]> {

    const url = `${this.apiUrl}/capital/${term}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCapital = { term, countries }),
        tap(() => this.saveToLocalStorage()),
      );
  }

  searchCountry(term: string): Observable<Country[]> {

    // https://restcountries.com/v3.1/name/aruba
    const url = `${this.apiUrl}/name/${term}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCountry = { term, countries }),
        tap(() => this.saveToLocalStorage()),
      );
  }

  searchRegion(region: Region): Observable<Country[]> {

    // https://restcountries.com/v3.1/region/europe
    const url = `${this.apiUrl}/region/${region}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = { region, countries }),
        tap(() => this.saveToLocalStorage()),
      );
  }

}