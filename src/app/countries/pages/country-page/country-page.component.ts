import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css']
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private countriesService: CountriesService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.countriesService.searchByAlphaCode(id))
      )
      .subscribe( (country) => {
        if(!country) return this.router.navigateByUrl('')
        return this.country = country;
      });

      // STUB - Metodo basico Observable dentro de otro Observable

      // this.activateRoute.params
      // .subscribe(({id}) => {

      //   this.countriesService.searchByAlphaCode(id)
      //   .subscribe({
      //     next: (resp)=>{
      //       console.log(resp);
      //     },
      //     error: (error)=>{
      //       console.log(error);
      //     }
      //   })
      // })
  }


};
