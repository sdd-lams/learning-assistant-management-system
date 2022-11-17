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
  sortOptions: any[] = [
    // Default option at index 0
    { option: 'ewsdate', text: 'Date' },
    // Other options
    { option: 'fname', text: 'Name' },
    { option: 'course', text: 'Course' },
    { option: 'status', text: 'Student Status' },
    { option: 'la', text: 'LA Assigned' },
    { option: 'ewsnum', text: 'Number of EWS' },
  ];
  selectedSortOption?: any;

  @Output() onRowClickEvent: EventEmitter<Student> = new EventEmitter();

  constructor(private requestService: RequestsService) {}
  ngOnInit(): void {
    // Get student data from database
    this.requestService.getStudents().subscribe((_students: Student[]) => {
      this.students = _students;
      // Sort student data by defaut sort option
      this.sortEWS(this.sortOptions[0]);
    });
  }

  onRowClick(student: Student) {
    this.selectedStudent = student;
  }

  sortEWS(e: any) {
    console.log(e);
    if (e == undefined) {
      return;
    }
    this.selectedSortOption = e;
    if (e.option == 'ewsdate') {
      this.sortByEWSDate();
    } else if (e.option == 'fname') {
      this.sortByName();
    } else if (e.option == 'status') {
      this.sortByStatus();
    } else if (e.option == 'course') {
      this.sortByCourse();
    } else if (e.option == 'la') {
      this.sortByLA();
    } else if (e.option == 'ewsnum') {
      this.sortByEwsNum();
    }
  }

  sortByEWSDate() {
    this.students.sort((s1: Student, s2: Student) => {
      if (s1.ewsdate < s2.ewsdate) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  sortByName() {
    this.students.sort((s1: Student, s2: Student) => {
      if (s1.fname == s2.fname) {
        return 0;
      } else {
        return s1.fname < s2.fname ? -1 : 1;
      }
    });
  }

  sortByStatus() {
    this.students.sort((s1: Student, s2: Student) => {
      if (!s1.status) {
        return -1;
      } else if (!s2.status) {
        return 1;
      } else if (s1.status == s2.status) {
        return 0;
      } else {
        return s1.status < s2.status ? -1 : 1;
      }
    });
  }

  sortByCourse() {
    this.students.sort((s1: Student, s2: Student) => {
      if (s1.cname == s2.cname) {
        return 0;
      } else {
        return s1.cname < s2.cname ? -1 : 1;
      }
    });
  }

  sortByEwsNum() {
    this.students.sort((s1: Student, s2: Student) => {
      if (s1.ewscount == s2.ewscount) {
        return 0;
      } else {
        return s1.ewscount < s2.ewscount ? -1 : 1;
      }
    });
  }

  sortByLA() {
    this.students.sort((s1: Student, s2: Student) => {
      if (!s1.assignedla) {
        return -1;
      } else if (!s2.assignedla) {
        return 1;
      } else if (s1.assignedla == s2.assignedla) {
        return 0;
      } else {
        return s1.assignedla < s2.assignedla ? -1 : 1;
      }
    });
  }
}
