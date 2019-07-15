import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sortable-th',
  templateUrl: './sortable-th.component.html',
  styleUrls: ['./sortable-th.component.css']
})
export class SortableThComponent implements OnInit {
  @Input() public col: string;
  @Input() public friendlyName: string;
  @Input() public currentOrder: string;
  @Output() clicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  currentOrderIcon(): string {
    switch (this.currentOrder) {
      case 'asc':
        return '▲';
      case 'desc':
        return '▼';
      default:
        return '▶';
    }
  }

  setOrder() {
    this.clicked.emit(this.col);
  }

}
