import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css']
})
export class PorPaisComponent {

  termino: string = '';
  isError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) { }

  buscar(termino: string) {
    // console.log(this.termino);
    this.isError = false;
    this.termino = termino;

    this.paisService.buscarPais(termino)
      .subscribe({
        next: (resp) => {
          this.paises = resp;
          console.log(this.paises);
        },
        error: (err) => {
          this.isError = true;
          console.log(err);
          this.paises = [];
        },
        complete: () => {
          console.log('completado');
        }
      })
  }

  sugerencias(termino: string) {

    this.isError = false;
    // console.log(termino)
    // this.paisService.buscarPais(termino)
    //   .subscribe({
    //     next: (resp) => {
    //       this.paises = resp;
    //       console.log(this.paises);
    //     }
    //   })
  }

}
