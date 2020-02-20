import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../../core/services/character.service';
import { Characters } from '../../core/models/characters';
import { SortableColumn } from '../../shared/sortable-table-header/sortable-column';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  columns: SortableColumn[] = [new SortableColumn('Id', false), new SortableColumn('Name', true), new SortableColumn('Image', false)];
  private limit: number;

  private characters: Characters;
  private sortableColumn: SortableColumn;

  constructor(
    private readonly characterService: CharacterService,
    private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.limit = CharacterService.limit;
    this.loadPage(1);
  }

  loadPage(page: number): void {
    this.characterService.getCharacters((page - 1) * CharacterService.limit, this.sortableColumn).subscribe(characters => {
      this.characters = characters;
    });
  }

  trackByFn(index): number {
    return index;
  }

  sortPage(column: SortableColumn): void {
    this.sortableColumn = column;
    this.loadPage(1);
  }
}
