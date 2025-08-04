import { Component, OnInit } from '@angular/core';
import { MembersService } from '../shared/members.service';
import { Member } from '../shared/member';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table.html',
  styleUrls: ['./table.css']
})
export class TableComponent implements OnInit {

  members: Member[] = [];
  searchTerm: string = '';

  constructor(private membersService: MembersService) {}

  async ngOnInit() {
    this.members = await this.membersService.getAll();
  }

  get filteredMembers(): Member[] {
    return this.members.filter(m =>
      m.forename.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      m.surname.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
