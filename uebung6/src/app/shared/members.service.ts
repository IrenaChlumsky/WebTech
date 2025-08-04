import { Injectable } from '@angular/core';
import { Member } from './member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor() { }

  async getAll(): Promise<Member[]> {
    const response = await fetch('/members.json');
    const members = await response.json();
      console.log('LOADED:', members); 
    return members;
  }
}
