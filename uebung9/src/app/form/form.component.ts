import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { BackendService } from '../shared/backend';
import { User } from '../shared/user';

@Component({
  selector: 'app-form',
  standalone: true,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule
  ]
})
export class FormComponent {
  // Formular
  userForm: FormGroup;

  // Backend-Service
  private bs = inject(BackendService);

  // Beispieloptionen für Rolle
  roles = ['admin', 'user', 'guest'];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const newUser: User = this.userForm.value;
      console.log('Formular abgeschickt:', newUser);

      this.bs.createNewUser(newUser).subscribe({
        next: (res) => console.log('User erfolgreich erstellt:', res),
        error: (err) => console.error('Fehler beim Erstellen des Users:', err)
      });
    } else {
      console.log('Formular ist ungültig');
    }
  }
}