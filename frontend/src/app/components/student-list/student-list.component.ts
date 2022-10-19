import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Student } from '../../interfaces/student';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  @Input() students!: Student[];
  @Output() onRowClickEvent: EventEmitter<Student> = new EventEmitter();

  constructor() {}
  ngOnInit(): void {}

  onRowClick(student: Student) {
    this.onRowClickEvent.emit(student);
  }
}
