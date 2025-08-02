// app.routes.ts
import { Routes } from '@angular/router';
import { Table } from './table/table';
import { Form } from './form/form';

export const routes: Routes = [
  { path: 'read', component: Table },
  { path: 'create', component: Form },
];
