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
  loading = true;
  error = '';

  async ngOnInit() {
    try {
      this.pokemons = await this.data.getAll();
    } catch (e) {
      this.error = (e as Error).message ?? 'Fehler beim Laden';
    } finally {
      this.loading = false;
    }
  }
onEdit(p: Pokemon) {
  console.log('edit', p);
}

onRemove(p: Pokemon) {
  console.log('remove', p);
}


}

