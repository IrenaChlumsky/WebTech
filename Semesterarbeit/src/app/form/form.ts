import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  onSubmit() {
    if (this.form.valid) {
      console.log('Pokémon gespeichert:', this.form.value);
      // hier später: Backend-Call
    } else {
    
      this.form.markAllAsTouched();
      console.log('Formular ist ungültig');
    }
  }
}
