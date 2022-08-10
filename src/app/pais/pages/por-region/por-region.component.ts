import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.css']
})
export class PorRegionComponent {

   regiones: string[] = ['america', 'africa', 'asia', 'europe', 'oceania'];
   regionActiva: string = '';
   paises: Country[] = [];

   constructor(private paisService: PaisService) { }

   activarRegion(region: string) {
      if (region === this.regionActiva) return;

      this.regionActiva = region;
      this.paises = [];
      this.paisService.buscarRegion(region)
         .subscribe({
            next: (resp) => {
               this.paises = resp;
            },
            error: (err) => {
               console.log(err);
               this.paises = [];
            },
            complete: () => {
               console.log('completado')
            }
         })
   }



}
