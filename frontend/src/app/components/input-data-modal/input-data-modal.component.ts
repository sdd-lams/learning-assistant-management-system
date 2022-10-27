import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-data-modal',
  templateUrl: './input-data-modal.component.html',
  styleUrls: ['./input-data-modal.component.css'],
})
export class InputDataModalComponent implements OnInit {
  @Output() onSubmitEvent: EventEmitter<boolean> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onSubmitClose() {
    this.onSubmitEvent.emit();
  }
}
