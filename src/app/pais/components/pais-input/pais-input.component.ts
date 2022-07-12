import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styleUrls: ['./pais-input.component.css']
})
export class PaisInputComponent implements OnInit {

  termino: string = "";

  @Input() placeholder: string = "";

  @Output() onTermino: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  debounce: Subject<string> = new Subject();

  constructor() { }

  ngOnInit(): void {
    this.debounce
      .pipe(
        debounceTime(500)
      )
      .subscribe(valor => {
        this.onDebounce.emit(valor);
      })
  }

  buscar() {
    this.onTermino.emit(this.termino);
  }

  teclaPresionada() {
    // ? el valor del input es capturado por el ngModel para usarlo aquí
    this.debounce.next(this.termino);
  }

}
