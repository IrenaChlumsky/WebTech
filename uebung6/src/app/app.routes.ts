// app.routes.ts
import { Routes } from '@angular/router';
import { Table } from './table/table';
import { Form } from './form/form';

export const routes: Routes = [
  { path: '', component: Table },
    { path: '', redirectTo: 'read', pathMatch: 'full' },
  { path: 'read', component: Table },
  { path: 'create', component: Form },
];
