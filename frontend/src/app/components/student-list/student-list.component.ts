import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Student } from '../../interfaces/student';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  selectedStudent?: Student = undefined;

  @Output() onRowClickEvent: EventEmitter<Student> = new EventEmitter();

  constructor(private requestService: RequestsService) {}
  ngOnInit(): void {
    this.requestService.getStudents().subscribe((_students: Student[]) => {
      this.students = _students;
    });
  }

  onRowClick(student: Student) {
    this.selectedStudent = student;
  }
}
