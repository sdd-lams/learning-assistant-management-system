import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-la-contact-modal',
  templateUrl: './la-contact-modal.component.html',
  styleUrls: ['./la-contact-modal.component.css']
})
export class LaContactModalComponent implements OnInit {
  @Output() onSubmitEvent: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {}

  onClose() {
    this.onSubmitEvent.emit();
  }
}
