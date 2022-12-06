import { AuthService } from './../../services/auth.service';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent{
  constructor(public authService: AuthService) {}

  @Output() signUp = new EventEmitter<boolean>();
}
