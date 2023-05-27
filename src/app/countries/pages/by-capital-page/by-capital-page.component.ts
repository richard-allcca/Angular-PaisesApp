import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term || '';
  }

  searchByCapital(term: string) {
    this.isLoading = true;

    this.countriesService.searchCapital(term)
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
