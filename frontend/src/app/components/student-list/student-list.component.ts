import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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
  displayImportModal = false;
  numStudents = 0;
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

      // handle dates better
      for (const student of this.students) {
        student.ewsdate = new Date(student.ewsdate.toString());
      }
      this.numStudents = this.students.length;
    });
  }

  onRowClick(student: Student) {
    this.selectedStudent = student;
    this.displayImportModal = false;
  }

  deleteStudent(student: Student) {
    this.requestService.deleteStudent(student).subscribe((res: string) => {
      console.log(res);
      this.selectedStudent = undefined;

      this.requestService.getStudents().subscribe((_students: Student[]) => {
        this.students = _students;
        // Sort student data by defaut sort option
        this.sortEWS(this.selectedSortOption);

        // handle dates better
        for (const student of this.students) {
          student.ewsdate = new Date(student.ewsdate.toString());
        }
        this.numStudents = this.students.length;
      });
    });
  }

  showInputModal() {
    this.displayImportModal = true;
    this.selectedStudent = undefined;
  }

  closeInputModal(_students: Student[]) {
    this.students = _students;
    this.sortEWS(this.selectedSortOption);
    this.numStudents = this.students.length;

    // handle dates better
    for (const student of this.students) {
      student.ewsdate = new Date(student.ewsdate.toString());
    }
    this.displayImportModal = false;
  }

  sortEWS(e: any) {
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

  // Sort by ews date, most recent first
  sortByEWSDate() {
    this.students.sort((s1: Student, s2: Student) => {
      if (s1.ewsdate == s2.ewsdate) {
        return this.sortStr(s1.fname, s2.fname);
      }
      if (s1.ewsdate < s2.ewsdate) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  // Sort by student first name alphabetically
  sortByName() {
    this.students.sort((s1: Student, s2: Student) => {
      return this.sortStr(s1.fname, s2.fname);
    });
  }

  // Sort by student status, no status first then alphabetically
  sortByStatus() {
    this.students.sort((s1: Student, s2: Student) => {
      if (!s1.status) {
        return -1;
      } else if (!s2.status) {
        return 1;
      } else if (s1.status == s2.status) {
        return this.sortStr(s1.fname, s2.fname);
      } else {
        return s1.status < s2.status ? -1 : 1;
      }
    });
  }

  // Sort by course name alphabetically
  sortByCourse() {
    this.students.sort((s1: Student, s2: Student) => {
      if (s1.cname == s2.cname) {
        return this.sortStr(s1.fname, s2.fname);
      } else {
        return s1.cname < s2.cname ? -1 : 1;
      }
    });
  }

  // Sort by number of EWS (descending - most number of ews first)
  sortByEwsNum() {
    this.students.sort((s1: Student, s2: Student) => {
      if (s1.ewscount == s2.ewscount) {
        return this.sortStr(s1.fname, s2.fname);
      } else {
        return s1.ewscount < s2.ewscount ? 1 : -1;
      }
    });
  }

  // Sort by la assigned, no la assigned first then alphabetically
  sortByLA() {
    this.students.sort((s1: Student, s2: Student) => {
      if (!s1.assignedla) {
        return -1;
      } else if (!s2.assignedla) {
        return 1;
      } else if (s1.assignedla == s2.assignedla) {
        return this.sortStr(s1.fname, s2.fname);
      } else {
        return s1.assignedla < s2.assignedla ? -1 : 1;
      }
    });
  }

  sortStr(n1: string, n2: string) {
    if (n1 == n2) {
      return 0;
    } else {
      return n1 < n2 ? -1 : 1;
    }
  }
}
