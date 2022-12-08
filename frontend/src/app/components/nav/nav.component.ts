import { Component, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  @Output()
  displayImportModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  displayLaInfoModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  routeUserList() {
    this.router.navigate(['dashboard/users']);
  }

  redirectToStudentList() {
    this.router.navigate(['dashboard/students']);
  }

  redirectToLasList() {
    this.router.navigate(['dashboard/las']);
  }

  redirectToLaResource() {
    this.router.navigate(['dashboard/la-resource']);
  }

  logout() {
    this.auth.SignOut();
  }
}
