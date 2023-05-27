import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent {

  public countries: Country[] = [];
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) { }

  searchByCountry(term: string) {
    this.isLoading = true;

    this.countriesService.searchCountry(term)
      .subscribe({
        next: (resp) => {
          this.isLoading = false;
          this.countries = resp;
        },
        error: (error) => {
          throw new Error('Fallo la petición');
        },
        complete: () => {
          console.log('completado');
        }
      });
  }

}
