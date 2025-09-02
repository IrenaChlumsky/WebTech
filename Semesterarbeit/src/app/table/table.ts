import { Component,ElementRef, Inject, inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Pokemon } from '../shared/pokemon';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BackendService } from '../shared/backend';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class Table implements OnInit, AfterViewInit {
private backend = inject(BackendService);

  pokemons: Pokemon[] = [];
   view: Pokemon[] = [];
  loading = true;
  error = '';
  searchName = '';
  searchType = '';
    
   @ViewChild('deleteToastEl') deleteToastEl!: ElementRef<HTMLDivElement>;
  private deleteToast!: any;
  private pendingDeleteId: string | null = null;
  pendingDeleteName = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngOnInit() {
    try {
      this.pokemons = await this.backend.getAll();
      this.view = [...this.pokemons];
    } catch (e) {
      this.error = (e as Error).message ?? 'Fehler beim Laden';
    } finally {
      this.loading = false;
    }

  }
  ngAfterViewInit() {
    // nur im Browser initialisieren
    if (isPlatformBrowser(this.platformId)) {
      const bs = (window as any).bootstrap; //   (Hier Hilfe von ChatGPT, weil im Browser funtionsfähig trotzdem ein Fehler im Terminal angezeigt
      if (bs && this.deleteToastEl?.nativeElement) {
        this.deleteToast = new bs.Toast(this.deleteToastEl.nativeElement, { autohide: false });
      }
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

 onRemove(id: string) {
    const p = this.pokemons.find(x => x._id === id);
    if (!p || !this.deleteToast) return;

    this.pendingDeleteId = id;
    this.pendingDeleteName = p.name;
    this.deleteToast.show();
  }
  async onConfirmDelete(yes: boolean) {
    if (!this.deleteToast) return;
    this.deleteToast.hide();

    if (!yes || !this.pendingDeleteId) {
      this.pendingDeleteId = null;
      this.pendingDeleteName = '';
      return;
    }

    const id = this.pendingDeleteId;
    this.pendingDeleteId = null;
    this.pendingDeleteName = '';

    try {
    await this.backend.delete(id);   

    
    this.pokemons = this.pokemons.filter(x => x._id !== id);
    this.view = [...this.pokemons];
  } catch (e) {
    console.error(' Fehler beim Löschen:', e);  
   
  }
}
}



