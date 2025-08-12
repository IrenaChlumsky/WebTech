import { Injectable } from '@angular/core';
import type { Pokemon } from './pokemon';

@Injectable({ providedIn: 'root' })
export class DataService {
  async getAll(): Promise<Pokemon[]> {
    const res = await fetch('/data/pokemon.json');  
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as Pokemon[];
    console.log('pokemons', data);
    return data;
  }
}
