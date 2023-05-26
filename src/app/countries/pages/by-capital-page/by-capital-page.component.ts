import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];

  constructor( private countriesService: CountriesService ) { }

  searchByCapital(term: string){

    this.countriesService.searchCapital(term)
    .subscribe({
      next: (resp)=>{
        this.countries = resp
      },
      error: (error)=>{
        throw new Error('Fallo la petición')
      },
      complete: ()=>{
        console.log('completado');
      }
    })
  }

}
