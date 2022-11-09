import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css'],
})
export class DropDownComponent implements OnInit {
  @Input() options!: string[];
  @Input() default!: string;
  @Input() labelText?: string;

  selectedVal?: string;
  @Output() onSelectEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}
  ngOnInit(): void {
    this.selectedVal = this.default;
  }

  onSelect() {
    this.onSelectEvent.emit(this.selectedVal);
  }
}
