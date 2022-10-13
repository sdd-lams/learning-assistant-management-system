import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../interfaces/student';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  @Input() students: Student[] = [];

  constructor(private requestService: RequestsService) {}

  ngOnInit(): void {
    this.requestService.getStudents().subscribe((allStudents: Student[]) => {
      this.students = allStudents;
    });
  }
}
