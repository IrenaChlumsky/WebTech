import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackendService } from '../shared/backend';
import { Pokemon } from '../shared/pokemon';




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
    level:  new FormControl<number | null>(null, [Validators.required, Validators.min(1), Validators.max(100)]),
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
    this.errorMsg = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log('Formular ist ungültig');
      return;
    }

     this.saving = true;
    const dto = {
  ...(this.form.getRawValue() as any),
  level: Number(this.form.value.level ?? 0),
  attacks: (this.form.value.attacks ?? '')
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean)
} as Pokemon;
    
      try {
      await this.backend.create(dto);       // ⬅️ HIER passiert das Speichern
      this.successMsg = 'Gespeichert.';
      this.form.reset();
    } catch (e: any) {
      console.error(e);
      this.errorMsg = 'Speichern fehlgeschlagen.';
    } finally {
      this.saving = false;
    }
  }

  onCancel(): void {
    this.form.reset();
    this.successMsg = '';
    this.errorMsg = '';
  }
}