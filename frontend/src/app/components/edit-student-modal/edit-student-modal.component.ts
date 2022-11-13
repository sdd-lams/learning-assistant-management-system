import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../../interfaces/student';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-edit-student-modal',
  templateUrl: './edit-student-modal.component.html',
  styleUrls: ['./edit-student-modal.component.css'],
})
export class EditStudentModalComponent implements OnInit {
  @Input() student!: Student;
  @Output() onSubmitEvent: EventEmitter<boolean> = new EventEmitter();

  studentStatus?: String;
  assignedLA?: String;

  constructor(private requestService: RequestsService) {}

  ngOnInit(): void {
    this.assignedLA = this.student.assignedla;
    this.studentStatus = this.student.status;
  }

  incrementEWS(n: number) {
    let ewsNum: number = this.student.ewscount;
    this.student.ewscount = ewsNum + n;
  }

  updateStudentStatus() {
    this.student.status = this.studentStatus;
  }

  updateAssignedLA() {
    this.student.assignedla = this.assignedLA;
  }

  onSubmitClose(updateStudent: boolean) {
    if (updateStudent) {
      this.requestService.editStudent(this.student).subscribe((str: String) => {
        console.log(str);
      });
    }
    this.onSubmitEvent.emit();
  }
}
