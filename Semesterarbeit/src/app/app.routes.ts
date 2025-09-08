import { Routes } from '@angular/router';
import { Home as Home } from './home/home';
import { Form as Form } from './form/form';
import { Table as Table } from './table/table';


export const routes: Routes = [
{ path: '', pathMatch: 'full', redirectTo: 'home' },
{ path: 'form', component: Form },
{ path: 'table',   component: Table },
{ path: 'home',   component: Home }


 
];
