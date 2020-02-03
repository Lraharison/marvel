import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Md5 } from 'ts-md5';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private readonly datePipe: DatePipe) {
  }

  createApiUrl(subPath: string): string {
    const currentDate = new Date();
    const timestamp = this.datePipe.transform(currentDate, 'yyyyMMddhhmmss');
    const hash = new Md5().appendStr(`${ timestamp }${ environment.apiPrivateKey }${ environment.apiPublicKey }`).end();
    return `${ environment.apiUrl }/${ subPath }&apikey=${ environment.apiPublicKey }&ts=${ timestamp }&hash=${ hash }`;
  }
}
