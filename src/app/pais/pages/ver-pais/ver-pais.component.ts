import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styleUrls: ['./ver-pais.component.css']
})
export class VerPaisComponent implements OnInit {

  termino: string = '';
  isError: boolean = false;
  pais: Country[] = []
  idiomas: string[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private paisService: PaisService
  ) { }

  ngOnInit(): void {

    // ? refactor
    this.activateRoute.params
      .pipe(
        // obtenemos el id del país desde la url(en routing se le puso "id")
        switchMap(({ id }) => this.paisService.verPaisPorId(id)),
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
        }
      })

    // ? método sin refactor
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
