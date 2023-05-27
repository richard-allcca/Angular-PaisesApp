import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap, Observable } from 'rxjs';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styleUrls: ['./ver-pais.component.css'],
})

// REVIEW - DEBOUNCE Método para sugerencia de búsqueda mientras se escribe

export class VerPaisComponent implements OnInit {
  termino: string = '';
  isError: boolean = false;
  pais: Country[] = [];
  idiomas: string[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private paisService: PaisService
  ) {}

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        // switchMap cambia un Observable por otro
        switchMap(({ id }) => this.paisService.verPaisPorId(id)),
        tap(console.log)
      )
      .subscribe({
        next: (resp) => {
          this.pais = resp;
          const idiomas = Object.values(this.pais[0].languages);
          this.idiomas = idiomas;
        },
        error: (err) => {
          this.isError = true;
          this.pais = [];
          this.idiomas = [];
        },
      });

    // STUB - Método basico un Observable dentro de otro Observable
    // this.activateRoute.params.subscribe(params => {
    //   const { id } = params;
    //   this.paisService.verPaisPorId(id)
    //     .subscribe({
    //       next: (resp) => {
    //         this.pais = resp;
    //         console.log(this.pais);
    //       },
    //       error: (err) => { }
    //     })
    // })
  }
}
