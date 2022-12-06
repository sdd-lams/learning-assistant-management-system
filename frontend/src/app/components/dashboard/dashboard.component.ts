import { Component} from '@angular/core';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent{
  displayImportModal = false;
  displayLaContactModal = false;

  constructor(private requestService: RequestsService) {}

  showInputModal() {
    this.displayImportModal = true;
  }

  closeInputModal() {
    this.displayImportModal = false;
  }

  showLaContactModal() {
    this.displayLaContactModal = true;
  }

  closeLaContactModal() {
    this.displayLaContactModal = false;
  }
}
