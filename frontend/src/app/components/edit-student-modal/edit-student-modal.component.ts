import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../interfaces/student';

@Component({
  selector: 'app-edit-student-modal',
  templateUrl: './edit-student-modal.component.html',
  styleUrls: ['./edit-student-modal.component.css'],
})
export class EditStudentModalComponent implements OnInit {
  @Input() student!: Student;
  constructor() {}

  ngOnInit(): void {}
}
