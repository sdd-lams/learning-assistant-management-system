import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}

  importModalClick() {
    this.displayImportModal.emit();
  }

  displayLaInfoModalClick() {
    console.log("the LaInfo Modal has been clicked");
    this.displayLaInfoModal.emit();
  } 
}
