import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../services/requests.service';
import { User } from '../../interfaces/user';
import { allowedNodeEnvironmentFlags } from 'process';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users!: User[];
  showbtn: boolean = true;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.GetUsers().subscribe((_users: User[]) => {
      console.log(_users);
      this.users = _users;
    });
  }
  addRole() {
    this.authService.AddRole();
  }

  removeRole() {
    this.authService.RemoveRole();
  }
}
