import { Component, EventEmitter, Output, Input } from '@angular/core';


@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  @Input() placeholder: string = "";
  @Output() onValue: EventEmitter<string> = new EventEmitter();

  emitValue(value: string):void {

    this.onValue.emit(value)
  }
}

