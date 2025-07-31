import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { Nav } from "./nav/nav";
import { MainComponent } from "./main/main";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Nav, MainComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('first');
}
