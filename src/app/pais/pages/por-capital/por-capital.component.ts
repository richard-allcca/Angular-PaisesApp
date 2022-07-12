import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styleUrls: ['./por-capital.component.css']
})
export class PorCapitalComponent {

  termino: string = '';
  isError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) { }

  buscar(termino: string) {
    // console.log(this.termino);
    this.isError = false;
    this.termino = termino;

    this.paisService.buscarCapital(termino)
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
    // this.paisService.buscarCapital(termino)
    //   .subscribe({
    //     next: (resp) => {
    //       this.paises = resp;
    //       console.log(this.paises);
    //     }
    //   })
  }

}
