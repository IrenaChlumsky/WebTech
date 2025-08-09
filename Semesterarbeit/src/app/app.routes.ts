import { Routes } from '@angular/router';
import { Form as Form } from './form/form';
import { Table as Table } from './table/table';

export const routes: Routes = [ { path: 'create', component: Form },  // Formular
  { path: 'read',   component: Table }, // Tabelle
  { path: '', pathMatch: 'full', redirectTo: 'read' }];
