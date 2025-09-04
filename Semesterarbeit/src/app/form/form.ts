import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackendService } from '../shared/backend';

import { Pokemon, PokemonType } from '../shared/pokemon';



declare var bootstrap: any;

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.css'
})

export class Form {
  form = new FormGroup({
    name:   new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    level:  new FormControl<number | null>(null, [Validators.required, Validators.min(1), Validators.max(100)]), //Startwert null
    type1:  new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    type2:  new FormControl<string>(''),
    attacks:new FormControl<string>(''),
  });
  saving = false;
  successMsg = '';
  errorMsg = '';

  constructor(private backend: BackendService) {}
  

  async onSubmit(): Promise<void> {
    this.successMsg = '';
    
    if (this.form.invalid) {
      this.form.markAllAsTouched();
     return;
    }

     
  // 1) Rohwerte holen
  const raw = this.form.getRawValue();;
  const level = Number(raw.level ?? 0);
  const type1 = raw.type1 as PokemonType;                      
  const type2 = raw.type2 ? (raw.type2 as PokemonType) : undefined;
  const attacks = (raw.attacks ?? '')
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0);
    
  const dataObject: Pokemon = {
    name: raw.name ?? '',
    level,
    type1,
    type2,
    attacks
  };


    
      try {
      await this.backend.create(dataObject);       //  HIER passiert das Speichern
      this.successMsg = 'Gespeichert.';
      this.form.reset();
      this.showToast();
    } catch (e: any) {
      console.error(e);
      this.errorMsg = 'Speichern fehlgeschlagen.';
      this.showErrorToast();
    } finally {
      this.saving = false;
    }
  }

  onCancel(): void {
    this.form.reset();
    this.successMsg = '';
    this.errorMsg = '';
  }

  private showToast() {
    const toastElement = document.getElementById('saveToast');
    if (toastElement) {
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
}
private showErrorToast() {
    const el = document.getElementById('errorToast');
    if (el) {
      const toast = new bootstrap.Toast(el);
      toast.show();
    }
  }
}