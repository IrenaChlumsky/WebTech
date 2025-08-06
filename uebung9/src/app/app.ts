import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavComponent } from './nav/nav.component';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';
import { MatSidenavContent } from "@angular/material/sidenav";
import { MatSidenavContainer, MatSidenav } from "../../node_modules/@angular/material/sidenav/index";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatSlideToggleModule,
    NavComponent,
    FormComponent,
    TableComponent, MatSidenavContent, MatSidenavContainer, MatSidenav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'uebung9';
}