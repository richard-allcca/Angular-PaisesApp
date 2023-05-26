import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Country } from '../interfaces/pais.interface';
import { cacheStore } from '../interfaces/cache-store';
import { Region } from '../interfaces/region-type';

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

  public cacheStore: cacheStore = {
    byCapital: { term: '', countries: []},
    byCountries: { term: '', countries: []},
    byRegion: { region: "", countries: []}
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage()
  }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
  }

  private loadFromLocalStorage(){
    if(!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)
  }

  verPaisPorId(id: string): Observable<Country[]> {
    const url = `${this.apiUrl}/alpha/${id}`;

    return this.http.get<Country[]>(url);
  }

  // NOTE
  // 1° tap => salva le resp en cacheStore
  // 2° tap => ejecuta el método salva el contenido de cacheStore en el ls

  buscarPais(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;

    return this.http.get<Country[]>(url, { params: this.httParams })
    .pipe(
      tap(countries => this.cacheStore.byCountries = {term, countries}),
      tap(()=> this.saveToLocalStorage())
    )
  }

  buscarCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;

    return this.http.get<Country[]>(url, { params: this.httParams })
    .pipe(
      tap(countries => this.cacheStore.byCapital = {term, countries}),
      tap(()=> this.saveToLocalStorage())
    )
  }

  buscarRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;

    return this.http.get<Country[]>(`${url}`, { params: this.httParams })
    .pipe(
      tap(countries => this.cacheStore.byRegion = { region, countries }),
      tap(()=> this.saveToLocalStorage())
    )
  }
}
