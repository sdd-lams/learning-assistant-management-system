import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users!: User[];
  showbtn: boolean = true;
  laUsers: User[] = [];
  regUsers: User[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.GetUsers().subscribe((_users: User[]) => {
      console.log(_users);
      this.users = _users;

      for (let user of this.users) {
        if (user.role?.toLowerCase() == 'la') {
          this.laUsers.push(user);
        } else {
          this.regUsers.push(user);
        }
      }
    });
  }

  addRole(user: User) {
    this.authService.AddRole();
    this.regUsers = this.regUsers.filter((u) => u != user);
  }

  removeRole(user: User) {
    this.authService.RemoveRole();
    this.laUsers = this.laUsers.filter((u) => u != user);
  }
}
