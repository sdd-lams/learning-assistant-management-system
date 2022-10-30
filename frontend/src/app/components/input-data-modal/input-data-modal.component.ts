import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-input-data-modal',
  templateUrl: './input-data-modal.component.html',
  styleUrls: ['./input-data-modal.component.css'],
})
export class InputDataModalComponent implements OnInit {
  ewsData?: string;
  @Output() onSubmitEvent: EventEmitter<boolean> = new EventEmitter();
  constructor(private requestService: RequestsService) {}
  ngOnInit(): void {}

  onSubmitClose() {
    console.log(this.ewsData);
    this.onSubmitEvent.emit();
  }
}
