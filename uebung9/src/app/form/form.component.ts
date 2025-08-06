import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

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
  addressForm: FormGroup;
  hasUnitNumber = false;

  states = [
    { name: 'Berlin', abbreviation: 'BE' },
    { name: 'Hamburg', abbreviation: 'HH' },
    { name: 'Bayern', abbreviation: 'BY' },
    { name: 'Sachsen', abbreviation: 'SN' },
    { name: 'NRW', abbreviation: 'NW' }
  ];

  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      company: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: [''],
      shipping: ['free']
    });
  }

  onSubmit() {
    if (this.addressForm.valid) {
      console.log('Formular abgeschickt:', this.addressForm.value);
    } else {
      console.log('Formular ist ungültig');
    }
  }
}
