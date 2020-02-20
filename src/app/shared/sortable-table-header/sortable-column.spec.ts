import { SortableColumn } from './sortable-column';
import { Direction } from './direction.enum';

describe('SortableColumn', () => {

  it('should toggle asc to desc', () => {
    const sortableColumn: SortableColumn = new SortableColumn('Name', true);
    sortableColumn.direction = Direction.ASC;

    sortableColumn.toggleDirection();

    console.log(sortableColumn.direction);
    expect(sortableColumn.direction.toString()).toEqual(Direction.DESC.toString());
  });

  it('should toggle desc to asc', () => {
    const sortableColumn: SortableColumn = new SortableColumn('Name', true);
    sortableColumn.direction = Direction.DESC;

    sortableColumn.toggleDirection();

    expect(sortableColumn.direction.toString()).toEqual(Direction.ASC.toString());
  });

  it('should toggle undefined to desc', () => {
    const sortableColumn: SortableColumn = new SortableColumn('Name', true);

    sortableColumn.toggleDirection();

    expect(sortableColumn.direction.toString()).toEqual(Direction.DESC.toString());
  });

  it('should not to toggle if not sortable', () => {
    const sortableColumn: SortableColumn = new SortableColumn('Name', false);
    sortableColumn.direction = Direction.ASC;

    sortableColumn.toggleDirection();

    expect(sortableColumn.direction.toString()).toEqual(Direction.ASC.toString());
  });
});
