import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RequestsService } from '../../services/requests.service';
import { Student } from '../../interfaces/student';

@Component({
  selector: 'app-input-data-modal',
  templateUrl: './input-data-modal.component.html',
  styleUrls: ['./input-data-modal.component.css'],
})
export class InputDataModalComponent implements OnInit {
  ewsData?: string;
  allStudents?: Student[];
  @Output() onCloseEvent: EventEmitter<any> = new EventEmitter();
  @Output() onSubmitEvent: EventEmitter<Student[]> = new EventEmitter();

  constructor(private requestService: RequestsService) {}
  ngOnInit(): void {}

  onClose() {
    this.onCloseEvent.emit();
  }

  onSubmitSendDataClose() {
    this.allStudents = this.parseData(this.ewsData);
    if (this.allStudents.length > 0) {
      this.requestService
        .postStudents(this.allStudents)
        .subscribe((str: String) => {
          console.log(str);

          this.requestService.getStudents().subscribe((students: Student[]) => {
            console.log(students);
            this.onSubmitEvent.emit(students);
          });
        });
    }
  }

  parseData(data?: string): Student[] {
    if (data == undefined) {
      return [];
    }

    data = data.replace(/^\s*$(?:\r\n?|\n)/gm, '');
    let dataArr: string[] = data.split('\n');

    let allStudents: Student[] = [];
    let i: number = 0;

    if (dataArr[i].substring(0, 2) != '66') {
      return [];
    }

    let allStudentData: Array<string[]> = [];

    while (i < dataArr.length) {
      let student: string[] = [];

      if (dataArr[i].substring(0, 2) == '66') {
        student.push(dataArr[i]);

        let j: number = i + 1;
        let repeat = false;
        while (j < dataArr.length && dataArr[j].substring(0, 2) != '66') {
          if (j - i == 8 && dataArr[j].split(',').length == 2 && !repeat) {
            student.push('');
            repeat = true;
            continue;
          }
          repeat = false;

          if (dataArr[j] != '') student.push(dataArr[j]);
          j++;
        }

        i = j;
        if (student.length == 12) allStudentData.push(student);
      }
    }

    for (let student of allStudentData) {
      const studentObj: Student = {
        rin: parseInt(student[0]),
        fname: student[1].split(', ')[1],
        lname: student[1].split(', ')[0],
        email: student[2],
        ewsreason: student[3],
        ewsdate: new Date(student[4]),
        csubject: student[5],
        ccode: student[6],
        cname: student[7],
        profcomment: student[8],
        cprof: student[9],
        dorm: student[10],
        room: student[11],
        emailcount: 0,
        ewscount: 1,
      };
      allStudents.push(studentObj);
    }
    return allStudents;
  }
}
