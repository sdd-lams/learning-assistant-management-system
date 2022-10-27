import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  inputData: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  closeModal() {
    this.inputData = false;
    console.log(this.inputData);
  }
}
