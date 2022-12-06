import { AuthService } from './../../services/auth.service';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent{
  constructor(public authService: AuthService) {}

  @Output() login = new EventEmitter<boolean>();


}
