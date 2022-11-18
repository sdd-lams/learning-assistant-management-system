import { Component, OnInit, Output } from '@angular/core';
import { Student } from '../../interfaces/student';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  displayImportModal: boolean = false;
  displayLaContactModal: boolean = false;

  constructor(private requestService: RequestsService) {}

  ngOnInit(): void {}

  showInputModal() {
    this.displayImportModal = true;
  }

  closeInputModal() {
    this.displayImportModal = false;
  }

  showLaContactModal() {
    console.log("will now display the La Contact modal");
    this.displayLaContactModal = true;
  }

  closeLaContactModal() {
    this.displayLaContactModal = false;
  }
}
