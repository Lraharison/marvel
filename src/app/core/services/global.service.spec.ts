import { TestBed } from '@angular/core/testing';

import { DatePipe } from '@angular/common';
import { GlobalService } from './global.service';
import { environment } from '../../../environments/environment';
import { SortableColumn } from '../../shared/sortable-table-header/sortable-column';
import { Direction } from '../../shared/sortable-table-header/direction.enum';

let service: GlobalService;
let datePipe: DatePipe;
const offset = 1;
const limit = 100;

describe('GlobalService', () => {
  beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [DatePipe]
      });
      service = TestBed.get(GlobalService);
      datePipe = TestBed.get(DatePipe);
    }
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create API url without order by', () => {
    const timestamp = '202002202000';
    spyOn(datePipe, 'transform').and.returnValue(timestamp);

    const url = service.createApiUrl('characters', offset, limit, null);

    expect(url).toContain(`${ environment.apiUrl }/characters`);
    expect(url).toContain(`apikey=${ environment.apiPublicKey }&ts=${ timestamp }`);
    expect(url).toContain(`limit=${ limit }`);
    expect(url).toContain(`offset=${ offset }`);
    expect(url).not.toContain(`orderBy=`);
  });

  it('should create API url with order by name asc', () => {
    const timestamp = '202002202000';
    spyOn(datePipe, 'transform').and.returnValue(timestamp);
    const sortableColumn: SortableColumn = new SortableColumn('Name', true);
    sortableColumn.direction = Direction.ASC;

    const url = service.createApiUrl('characters', offset, limit, sortableColumn);

    expect(url).toContain(`${ environment.apiUrl }/characters`);
    expect(url).toContain(`apikey=${ environment.apiPublicKey }&ts=${ timestamp }`);
    expect(url).toContain(`limit=${ limit }`);
    expect(url).toContain(`offset=${ offset }`);
    expect(url).toContain('orderBy=name');
  });

  it('should create API url with order by name desc', () => {
    const timestamp = '202002202000';
    spyOn(datePipe, 'transform').and.returnValue(timestamp);
    const sortableColumn: SortableColumn = new SortableColumn('Name', true);
    sortableColumn.direction = Direction.DESC;

    const url = service.createApiUrl('characters', offset, limit, sortableColumn);

    expect(url).toContain(`${ environment.apiUrl }/characters`);
    expect(url).toContain(`apikey=${ environment.apiPublicKey }&ts=${ timestamp }`);
    expect(url).toContain(`limit=${ limit }`);
    expect(url).toContain(`offset=${ offset }`);
    expect(url).toContain('&orderBy=-name');
  });
});
