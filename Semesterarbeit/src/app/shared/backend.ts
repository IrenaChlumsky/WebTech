import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
@Injectable({
  providedIn: 'root'
})
export class BackendService {
    apiURL = 'http://localhost:3000';

  constructor() { }

  async getAll(): Promise<Pokemon[]> {
    let response = await fetch(this.apiURL + '/pokemon');
    let pokemon = await response.json();
    console.log('pokemon in service (getAll) : ', pokemon)
    return pokemon as Pokemon[];
  }

}
