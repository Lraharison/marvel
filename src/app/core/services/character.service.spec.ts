import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { CharacterService } from './character.service';
import { GlobalService } from './global.service';
import { LogService } from './log.service';

let globalService: GlobalService;
let service: CharacterService;
let httpMock: HttpTestingController;

describe('CharacterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GlobalService, LogService, DatePipe]
    });
    service = TestBed.get(CharacterService);
    globalService = TestBed.get(GlobalService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {

    expect(service).toBeTruthy();
  });

  it('should return characters', () => {
    const url = 'http://api.com';
    spyOn(globalService, 'createApiUrl').and.returnValue(url);
    const characters = {
      data: {
        total: 2, limit: 100, offset: 0, results:
          [{
            id: 1,
            name: 'aaa',
            thumbnail: { path: '', extension: '' }
          },
            {
              id: 2,
              name: 'bbb',
              thumbnail: { path: '', extension: '' }
            }]
      }
    };

    service.getCharacters(1, null).subscribe(result => {
      expect(result.results.length).toBe(2);
    });

    const req: TestRequest = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(characters);
  });

});
