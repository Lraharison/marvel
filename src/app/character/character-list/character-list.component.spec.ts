import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DebugElement, Type } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CharacterListComponent } from './character-list.component';
import { SortableTableHeaderComponent } from '../../shared/sortable-table-header/sortable-table-header.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { CharacterService } from '../../core/services/character.service';
import { GlobalService } from '../../core/services/global.service';
import { LogService } from '../../core/services/log.service';
import { Characters } from '../../core/models/characters';

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let characterService: CharacterService;
  let fixture: ComponentFixture<CharacterListComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [CharacterListComponent, SortableTableHeaderComponent, PaginationComponent],
      imports: [
        FontAwesomeModule,
        HttpClientTestingModule
      ],
      providers: [
        CharacterService,
        GlobalService,
        LogService,
        DatePipe,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of([{ id: 1 }]),
          },
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterListComponent);
    characterService = TestBed.get(CharacterService);
    const characters: Characters = {
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
    };
    spyOn(characterService, 'getCharacters').and.returnValue(of(characters));
    fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display characters', () => {
    fixture.detectChanges();

    const debugElements: DebugElement[] = fixture.debugElement.queryAll(By.css('tr'));

    expect(debugElements.length).toBe(3);
    const rows1: DebugElement[] = debugElements[1].children;
    expect(rows1[0].nativeElement.textContent.trim()).toBe('1');
    expect(rows1[1].nativeElement.textContent.trim()).toBe('aaa');
    const rows2: DebugElement[] = debugElements[2].children;
    expect(rows2[0].nativeElement.textContent.trim()).toBe('2');
    expect(rows2[1].nativeElement.textContent.trim()).toBe('bbb');
  });
});
