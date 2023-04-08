import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styleUrls: ['./ver-pais.component.css'],
})
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
    // Método para sugerencia de búsqueda mientras se escribe
    this.activateRoute.params
      .pipe(
        // obtenemos el id de la url(en routing se le puso "id")
        // switchMap cambia un Observable 'params' por otro 'paisService'
        // switchMap((param) => this.paisService.verPaisPorId(param.id)),
        switchMap(({ id }) => this.paisService.verPaisPorId(id)),
        // tap imprime en consola la respuesta
        tap(console.log)
      )
      .subscribe({
        next: (resp) => {
          this.pais = resp;
          const idiomas = Object.values(this.pais[0].languages);
          console.log(idiomas);
          this.idiomas = idiomas;
        },
        error: (err) => {
          this.isError = true;
          this.pais = [];
          this.idiomas = [];
        },
      });

    // Método sin refactor
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
