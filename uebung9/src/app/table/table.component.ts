import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface User {
  name: string;
  email: string;
  role: string;
}

const TEST_DATA: User[] = [
  { name: 'Anna', email: 'anna@example.com', role: 'Studentin' },
  { name: 'Lena', email: 'lena@example.com', role: 'Admin' },
  { name: 'Mira', email: 'mira@example.com', role: 'Lehrende' }
];

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  displayedColumns: string[] = ['name', 'email', 'role'];
  dataSource = new MatTableDataSource(TEST_DATA);
}
