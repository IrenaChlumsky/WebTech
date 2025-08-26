import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header} from './header/header';
import { Footer } from './footer/footer';
import { Nav } from './nav/nav';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Nav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
