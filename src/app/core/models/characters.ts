import { Character } from './character';

export interface Characters {
  offset: number;
  limit: number;
  total: number;
  results: Character[];
}
