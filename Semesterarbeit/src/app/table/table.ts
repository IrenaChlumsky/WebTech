import { Component,ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Pokemon } from '../shared/pokemon';
import { CommonModule } from '@angular/common';
import { BackendService } from '../shared/backend';
import { AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
declare const bootstrap: any;

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.css'
})

export class Table implements OnInit, AfterViewInit {
private backend = inject(BackendService);
  private router  = inject(Router); 
  pokemons: Pokemon[] = [];
   view: Pokemon[] = [];
  loading = true;
  error = '';
  searchName = '';
  searchType = '';
    
   @ViewChild('deleteToastEl') deleteToastEl!: ElementRef<HTMLDivElement>; //bootstrap Toast Element show,hide - chat gpt
  private deleteToast!: any;
  private pendingDeleteId: string | null = null;
  pendingDeleteName = '';

 

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
ngAfterViewInit(): void {
  if (!this.deleteToastEl?.nativeElement) return;                       // DOM vorhanden?
  if (typeof window === 'undefined' || typeof (window as any).bootstrap === 'undefined') return; // Nur im Browser + Bootstrap vorhanden

  const bs = (window as any).bootstrap;
  this.deleteToast = new bs.Toast(this.deleteToastEl.nativeElement, { autohide: false }); // problem mit laden von Bootstrap Hilfe durch chat gpt

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
onEdit(id: string) {
  this.router.navigate(['/form', id]);
}

}



