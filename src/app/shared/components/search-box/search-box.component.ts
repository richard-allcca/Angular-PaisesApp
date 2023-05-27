import { Component, EventEmitter, Output, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

// NOTE - Debounce
// Subject - tipo especial de Observable, son como emisores de evento
// El next() para hacer la siguiente emision del Observable
// El .pipe() usa el [debounceTime] para retrasar la emision del valor
// El .subscribe() de [debouncer] recibe el valor de .next()
// El onDebounce.emit emite el valor, en este caso al padre mediente
// debounserSuscription, permite almacenar una suscription para limpiarla con OnDestroy

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubcription?: Subscription;

  @Input() placeholder: string = "";

  @Output() onValue = new EventEmitter<string>();
  @Output() onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSubcription = this.debouncer
      .pipe(
        debounceTime(1000)
      )
      .subscribe(value => {
        this.onDebounce.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.debouncerSubcription?.unsubscribe();
  }

  emitValue(value: string): void {

    this.onValue.emit(value);
  }

  // madamos hacer una nueva emision por cada presiod de tecla
  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }
}

