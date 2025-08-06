import { Routes } from '@angular/router';
import { Home } from './home/home';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';


export const routes: Routes = [
  { path: '', component: Home }
  ,{ path: 'form', component: FormComponent },
 { path: 'table', component: TableComponent }

];
