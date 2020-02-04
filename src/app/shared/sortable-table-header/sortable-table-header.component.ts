import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SortableColumn } from './sortable-column';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[sortableTableHeader]',
  templateUrl: './sortable-table-header.component.html',
  styleUrls: ['./sortable-table-header.component.scss']
})
export class SortableTableHeaderComponent implements OnInit {
  @Input() columns: SortableColumn[];
  @Output() readonly sortedColumnEventEmitter: EventEmitter<SortableColumn> = new EventEmitter<SortableColumn>();

  ngOnInit(): void {
  }

  sort(column: SortableColumn): void {
    if (column.sortable) {
      column.toggleDirection();
      this.sortedColumnEventEmitter.emit(column);
    }
  }
}
