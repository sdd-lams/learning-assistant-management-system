import { Component, OnInit, Output } from '@angular/core';
import { Student } from '../../interfaces/student';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  students: Student[] = [];
  constructor(private requestService: RequestsService) {}
  selectedStudent?: Student = undefined;

  ngOnInit(): void {
    this.requestService.getStudents().subscribe((allStudents: Student[]) => {
      this.students = allStudents;
    });
  }

  updateDashboard() {
    this.requestService.getStudents().subscribe((allStudents: Student[]) => {
      this.students = allStudents;
    });
  }

  printRow(student: Student) {
    this.selectedStudent = student;
    console.log(
      `${this.selectedStudent.ewscount} - ${this.selectedStudent.fname} ${this.selectedStudent.lname}`
    );
  }
}
