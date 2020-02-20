import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SortableTableHeaderComponent } from './sortable-table-header.component';
import { SortableColumn } from './sortable-column';

describe('SortableTableHeaderComponent', () => {
  let component: SortableTableHeaderComponent;
  let fixture: ComponentFixture<SortableTableHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SortableTableHeaderComponent],
      imports: [FontAwesomeModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortableTableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort', () => {
    spyOn(component.sortedColumnEventEmitter, 'emit');
    const column: SortableColumn = new SortableColumn('name', true);

    component.sort(column);

    expect(component.sortedColumnEventEmitter.emit).toHaveBeenCalled();
  });
});
