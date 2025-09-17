import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackendService } from '../shared/backend';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon, PokemonType } from '../shared/pokemon';

declare var bootstrap: any;

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form implements OnInit {
  form = new FormGroup({
    name:    new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    level:   new FormControl<number | null>(null, [Validators.required, Validators.min(1), Validators.max(100)]),
    type1:   new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    type2:   new FormControl<string>(''),
    attacks: new FormControl<string>(''),
  });

  successMsg = '';
  errorMsg   = '';

  // Edit-Status
  isEdit = false;
  id: string | null = null;

  constructor(
    private backend: BackendService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    // Prüfen, ob :id in der URL steht → Edit-Modus
    this.id = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.id;

    if (this.isEdit && this.id) {
      try {
        const p = await this.backend.getOne(this.id);
        this.form.patchValue({
          name:    p.name  ?? '',
          level:   p.level ?? null,
          type1:   p.type1 ?? '',
          type2:   p.type2 ?? '',
          attacks: (p.attacks ?? []).join(', ')
        });
      } catch (e) {
        console.error('Fehler beim Laden:', e);
        this.errorMsg = 'Datensatz konnte nicht geladen werden.';
        this.showErrorToast();
      }
    }
  }

  async onSubmit(): Promise<void> {
    this.successMsg = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // 1) Rohwerte holen (deine Namen beibehalten)
    const raw = this.form.getRawValue();
    const level  = Number(raw.level ?? 0);
    const type1  = raw.type1 as PokemonType;
    const type2  = raw.type2 ? (raw.type2 as PokemonType) : undefined;
    const attacks = (raw.attacks ?? '')
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    // 2) Dein Objektname bleibt: dataObject
    const dataObject: Pokemon = {
      name: raw.name ?? '',
      level,
      type1,
      type2,
      attacks
    };

    // 3) Create vs. Update – minimal-invasiv
    try {
      if (this.isEdit && this.id) {
        await this.backend.update(this.id, dataObject);
        this.successMsg = 'Änderungen gespeichert.';
        this.showToast();
        this.router.navigate(['/table']); // ggf. an deine Listen-Route anpassen
      } else {
        await this.backend.create(dataObject);
        this.successMsg = 'Gespeichert.';
        this.form.reset();
        this.showToast();
      }
    } catch (e: any) {
      console.error(e);
      this.errorMsg = 'Speichern fehlgeschlagen.';
      this.showErrorToast();
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
