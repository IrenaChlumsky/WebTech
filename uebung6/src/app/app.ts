import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { Nav } from "./nav/nav";
import { Footer } from "./footer/footer";
import { Table } from "./table/table";
import { Form } from "./form/form";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Nav, Footer, Table, Form],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('uebung6');
}
