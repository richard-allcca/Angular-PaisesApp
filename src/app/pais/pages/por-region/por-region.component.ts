import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';
import { Region } from '../../interfaces/region-type';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.css'],
})
export class PorRegionComponent implements OnInit {
  regiones: Region[] = ['America', 'Africa', 'Asia', 'Europe', 'Oceania'];
  regionActiva: string = '';
  paises: Country[] = [];

  constructor(
    private paisService: PaisService) {}

  // Método sin uso para clases condicional
  getClaseCss(region: string): string {
    return region === this.regionActiva
      ? 'btn btn-primary'
      : 'btn btn-outline-primary';
  }

  ngOnInit():void{
    this.paises = this.paisService.cacheStore.byRegion.countries
  }

  // Método para listar paises de region selecionada
  activarRegion(region: Region) {
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
