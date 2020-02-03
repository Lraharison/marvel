import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../../core/services/character.service';
import { Characters } from '../../core/models/characters';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  private limit: number;

  private characters: Characters;

  constructor(
    private readonly characterService: CharacterService,
    private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.limit = CharacterService.limit;
    this.loadPage(1);
  }

  loadPage(page: number): void {
    this.characterService.getCharacters((page - 1) * CharacterService.limit).subscribe(characters => {
      this.characters = characters;
    });
  }

  trackByFn(index): number {
    return index;
  }
}
