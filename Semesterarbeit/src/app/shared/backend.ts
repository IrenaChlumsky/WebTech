import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  apiURL = 'http://localhost:3000';

  constructor() {}

  async getAll(): Promise<Pokemon[]> {
    let response = await fetch(this.apiURL + '/pokemon');
    let pokemon = await response.json();
    console.log('pokemon in service (getAll) : ', pokemon);
    return pokemon as Pokemon[];
  }

  async create(p: Pokemon): Promise<Pokemon> {
    const res = await fetch(`${this.apiURL}/pokemon`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(p),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`POST /pokemon failed: ${res.status} ${res.statusText} ${text}`);
    }
    const created = await res.json();
    console.log('pokemon created:', created);
    return created as Pokemon;
  }

  async delete(id: string): Promise<void> {
    await fetch(`${this.apiURL}/pokemon/${id}`, { method: 'DELETE' });
  }
}
