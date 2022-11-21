import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  showbtn: boolean = true;
  laUsers: User[] = [];
  regUsers: User[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    const _users = await this.authService.GetUsers();
    _users.forEach((user: any) => {
      var user_data: User = user.data();
      if (user_data.role == 'la') {
        this.laUsers.push(user_data);
      } else {
        this.regUsers.push(user_data);
      }
    });
  }

  addRole(user: User) {
    this.authService.AddRole(user.uid);
    this.regUsers = this.regUsers.filter((u) => u != user);
    this.laUsers.push(user);
  }

  removeRole(user: User) {
    this.authService.RemoveRole(user.uid);
    this.laUsers = this.laUsers.filter((u) => u != user);
    this.regUsers.push(user);

    console.log(JSON.parse(localStorage.getItem('user')!).uid);

    if (user.uid == JSON.parse(localStorage.getItem('user')!).uid) {
      this.router.navigate(['dashboard/la-resource']);
    }
  }
}
