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
  showbtn = true;
  laUsers: User[] = [];
  regUsers: User[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    const _users = await this.authService.GetUsers();
    _users.forEach((user: any) => {
      const user_data: User = user.data();
      if (user_data.role == 'la') {
        this.laUsers.push(user_data);
      } else {
        this.regUsers.push(user_data);
      }
    });
  }

  addRole(user: User) {
    this.authService.AddRole(user.uid);
    user.role = 'la';
    this.regUsers = this.regUsers.filter((u) => u != user);
    this.laUsers.push(user);
  }

  removeRole(user: User) {
    this.authService.RemoveRole(user.uid);
    user.role = 'none';
    this.laUsers = this.laUsers.filter((u) => u != user);
    this.regUsers.push(user);

    
    if (localStorage.getItem('user') != null) {
      const userItem: string = localStorage.getItem('user') as string
      console.log(JSON.parse(userItem).uid); 

      if (user.uid == JSON.parse(userItem).uid) {
        this.router.navigate(['dashboard/la-resource']);
      }
    }
  }
}
