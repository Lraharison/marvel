import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalRecords: number;
  @Input() itemsPerPage: number;
  @Output() readonly pageChangeEmitter: EventEmitter<number> = new EventEmitter();

  public pageNumbers = [];
  public currentPage = 1;

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.currentPage = 1;
    const size = Math.ceil(this.totalRecords / this.itemsPerPage);
    this.pageNumbers = Array.from(Array(size).keys()).map(k => k + 1);
    this.emitCurrentPage();
  }

  onClickPage(pageNumber: number): void {
    if (pageNumber < 1) { return; }
    if (pageNumber > this.pageNumbers.length) { return; }
    this.currentPage = pageNumber;
    this.emitCurrentPage();
  }

  trackByFn(index): number {
    return index;
  }

  private emitCurrentPage(): void {
    this.pageChangeEmitter.emit(this.currentPage);
  }
}
