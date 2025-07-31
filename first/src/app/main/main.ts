

import { Component } from '@angular/core';

import { Left } from "./left/left";
import { Right } from "./right/right";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ Left, Right],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class MainComponent {

}