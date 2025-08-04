// app.routes.ts
import { Routes } from '@angular/router';
import { TableComponent } from './table/table';
import { Form } from './form/form';

export const routes: Routes = [
  { path: '', component: TableComponent },
    { path: '', redirectTo: 'read', pathMatch: 'full' },
  { path: 'read', component: TableComponent },
  { path: 'create', component: Form },
];
