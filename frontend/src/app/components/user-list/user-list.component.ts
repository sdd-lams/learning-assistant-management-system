import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../services/requests.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  allUsers!: User[];
  constructor(private requestService: RequestsService) {}

  laUsers: User[] = [];
  regUsers: User[] = [];

  ngOnInit(): void {
    this.requestService.getUsers().subscribe((_users: User[]) => {
      this.allUsers = _users;
      console.log(this.allUsers);
      for (let usr of this.allUsers) {
        if (usr.role == 'LA') {
          this.laUsers.push(usr);
        } else {
          this.regUsers.push(usr);
        }
      }
    });
  }
}
