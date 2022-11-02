import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../../interfaces/student';

@Component({
  selector: 'app-edit-student-modal',
  templateUrl: './edit-student-modal.component.html',
  styleUrls: ['./edit-student-modal.component.css'],
})
export class EditStudentModalComponent implements OnInit {
  @Input() student!: Student;
  @Output() onSubmitEvent: EventEmitter<boolean> = new EventEmitter();

  studentStatus?: String;

  constructor() {}

  ngOnInit(): void {
    this.studentStatus = this.student.status;
  }

  incrementEWS(n: number) {
    let ewsNum: number = this.student.ewscount;
    this.student.ewscount = ewsNum + n;
  }

  updateStudentStatus() {
    this.student.status = this.studentStatus;
  }

  printStudent() {
    console.log(this.studentStatus);
    console.log(this.student);
  }

  onSubmitClose() {
    this.onSubmitEvent.emit();
  }
}
