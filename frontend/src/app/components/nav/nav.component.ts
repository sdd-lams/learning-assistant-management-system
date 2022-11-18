import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  @Output()
  displayImportModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  displayLaInfoModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  importModalClick() {
    this.displayImportModal.emit();
  }

  displayLaInfoModalClick() {
    console.log("the LaInfo Modal has been clicked");
    this.displayLaInfoModal.emit();
  } 
  routeUserList() {
    this.router.navigate(['dashboard/users']);
  }

  redirectToStudentList() {
    this.router.navigate(['dashboard/students']);
  }
}
