import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Md5 } from 'ts-md5';
import { environment } from '../../../environments/environment';
import { SortableColumn } from '../../shared/sortable-table-header/sortable-column';
import { Direction } from '../../shared/sortable-table-header/direction.enum';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private readonly datePipe: DatePipe) {
  }

  createApiUrl(subPath: string, offset: number, limit: number, sortableColumn: SortableColumn): string {

    const currentDate = new Date();
    const timestamp = this.datePipe.transform(currentDate, 'yyyyMMddhhmmss');
    const hash = new Md5().appendStr(`${ timestamp }${ environment.apiPrivateKey }${ environment.apiPublicKey }`).end();
    let path = `${ environment.apiUrl }/${ subPath }?limit=${ limit }&offset=${ offset }&apikey=${ environment.apiPublicKey }&ts=${ timestamp }&hash=${ hash }`;
    if (sortableColumn) {
      const orderByColumn = (sortableColumn.direction === Direction.ASC) ?
        sortableColumn.name.toLowerCase() : `-${ sortableColumn.name.toLowerCase() }`;
      path = `${ path }&orderBy=${ orderByColumn }`;
    }
    return path;
  }
}
