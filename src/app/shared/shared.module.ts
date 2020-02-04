import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSortAmountDown, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';
import { PaginationComponent } from './pagination/pagination.component';
import { SortableTableHeaderComponent } from './sortable-table-header/sortable-table-header.component';

@NgModule({
  declarations: [PaginationComponent, SortableTableHeaderComponent],
  exports: [
    PaginationComponent,
    SortableTableHeaderComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faSortAmountDown, faSortAmountUp);
  }
}
