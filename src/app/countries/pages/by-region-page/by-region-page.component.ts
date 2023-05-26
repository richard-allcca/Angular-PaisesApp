import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent {

  public countries: Country[] = [];

  constructor(private countriesService: CountriesService) { }

  searchByRegion(term: string) {
    this.countriesService.searchRegion(term)
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
