import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../shared/data';
import { Pokemon } from '../shared/pokemon';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class Table implements OnInit {
private data = inject(DataService);

  pokemons: Pokemon[] = [];
   view: Pokemon[] = [];
  loading = true;
  error = '';
  searchName = '';
    searchType = '';

  async ngOnInit() {
    try {
      this.pokemons = await this.data.getAll();
      this.view = [...this.pokemons];
    } catch (e) {
      this.error = (e as Error).message ?? 'Fehler beim Laden';
    } finally {
      this.loading = false;
    }
  }
  filterPokemon(nameValue: string, typeValue: string): void {
    this.searchName = nameValue.trim();
    this.searchType = typeValue.trim();


 if (!this.searchName && !this.searchType) {
      this.view = [...this.pokemons];
      return;
    }

    this.view = this.pokemons.filter(p => {
      const nameMatch = this.searchName
        ? p.name.toLowerCase().startsWith(this.searchName.toLowerCase())
        : true;

      const typeLabel = [p.type1, p.type2].filter(Boolean).join('/').toLowerCase();
      const typeMatch = this.searchType
        ? typeLabel.includes(this.searchType.toLowerCase())
        : true;

      return nameMatch && typeMatch;
    });
  }
    resetFilter(nameInput: HTMLInputElement, typeInput: HTMLInputElement) {
    this.searchName = '';
    this.searchType = '';
    nameInput.value = '';
    typeInput.value = '';
    this.view = [...this.pokemons];
  }
onEdit(p: Pokemon) {
  console.log('edit', p);
}

onRemove(p: Pokemon) {
  console.log('remove', p);
}


}

