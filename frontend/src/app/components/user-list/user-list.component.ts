import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../services/requests.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users!: User[];
  showbtn: boolean = true;
  constructor(private requestService: RequestsService) {}

  ngOnInit(): void {
    this.requestService.getUsers().subscribe((_users: User[]) => {
      this.users = _users;
    });
  }
}
