import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../Student';
import { STUDENTS } from '../../mock-students';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  @Input() students: Student[] = STUDENTS;
  constructor() {}

  ngOnInit(): void {}
}
