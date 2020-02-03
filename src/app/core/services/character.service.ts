import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { GlobalService } from './global.service';
import { LogService } from './log.service';
import { Characters } from '../models/characters';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  static readonly limit = 20;

  constructor(
    private readonly  globalService: GlobalService,
    private readonly logService: LogService,
    private readonly  httpClient: HttpClient) { }

  getCharacters(offset: number): Observable<Characters> {
    const characterSubPath = `characters?limit=${ CharacterService.limit }&offset=${ offset }`;
    // tslint:disable-next-line:no-any
    return this.httpClient.get<any>(this.globalService.createApiUrl(characterSubPath))
      .pipe(
        tap(_ => this.logService.info('CharacterService.getCharacters', 'Fetched characters')),
        map(response => response.data),
        catchError(err => {
          this.logService.error('CharacterService.getCharacters', err);
          return of(null);
        })
      );
  }
}
