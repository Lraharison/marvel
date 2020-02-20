import { Direction } from './direction.enum';

export class SortableColumn {
  name: string;
  direction: Direction;
  sortable: boolean;

  constructor(name: string, sortable: boolean) {
    this.name = name;
    this.sortable = sortable;
  }

  toggleDirection(): void {
    if (this.sortable) {
      switch (this.direction) {
        case Direction.ASC:
          this.direction = Direction.DESC;
          break;
        case Direction.DESC:
          this.direction = Direction.ASC;
          break;
        default:
          this.direction = Direction.DESC;
      }
    }
  }
}
