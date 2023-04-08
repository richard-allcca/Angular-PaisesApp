import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.css'],
})
export class PorRegionComponent {
  regiones: string[] = ['america', 'africa', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  paises: Country[] = [];

  constructor(private paisService: PaisService) {}

  // Método sin uso para clases condicional
  getClaseCss(region: string): string {
    return region === this.regionActiva
      ? 'btn btn-primary'
      : 'btn btn-outline-primary';
  }

  // Método para listar paises de region selecionada
  activarRegion(region: string) {
    // valida opcion seleccionada
    if (region === this.regionActiva) return;

    this.regionActiva = region;
    this.paises = [];
    this.paisService.buscarRegion(region).subscribe({
      next: (resp) => {
        this.paises = resp;
      },
      error: (err) => {
        console.log(err);
        this.paises = [];
      },
      complete: () => {
        console.log('completado');
      },
    });
  }
}
