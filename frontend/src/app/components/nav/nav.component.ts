import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  inputData: boolean = false;
  @Output() onCloseModal: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  closeModal() {
    this.inputData = false;
    this.onCloseModal.emit();
  }
}
