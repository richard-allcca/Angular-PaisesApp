import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

// NOTE - Debounce
// El valor del input es capturado por el ngModel
// El .next() esta enlazado al debounce que recibe el valor
// El .subscribe() de 'debounce' recibe el valor de .next()
// El .pipe() usa el 'debounceTime' para retrasar el subscribe()
// Finalmente el onDebounce.emit emite el valor

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styleUrls: ['./pais-input.component.css']
})
export class PaisInputComponent implements OnInit {

  @Input() placeholder: string = "";
  @Input() term: string = '';
  @Input() initialValue: string = '';

  @Output() onTermino: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  termino: string = "";
  debounce: Subject<string> = new Subject();

  constructor() { }

  ngOnInit(): void {
    this.termino = this.term || this.initialValue;

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
    this.debounce.next(this.termino);
  }

}

