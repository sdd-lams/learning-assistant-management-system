import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component} from '@angular/core';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent {
  constructor(public authService: AuthService, private router: Router) {}

  visitLogin() {
    this.router.navigate(['/login']).then(() => this.authService.reloadUser());
  }
}
