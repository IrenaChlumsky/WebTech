import { Routes } from '@angular/router';
import { Home as Home } from './home/home';
import { Form as Form } from './form/form';
import { Table as Table } from './table/table';


export const routes: Routes = [
{ path: 'create', component: Form },
{ path: 'read',   component: Table },
{ path: 'home',   component: Home },
{ path: '', pathMatch: 'full', redirectTo: 'read' }

 
];
