import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { parse } from 'path';
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
  @Output() onSubmitEvent: EventEmitter<boolean> = new EventEmitter();
  constructor(private requestService: RequestsService) {}
  ngOnInit(): void {}

  onSubmitClose() {
    // console.log(this.ewsData);
    this.allStudents = this.parseData(this.ewsData);
    console.log(this.allStudents);
    this.onSubmitEvent.emit();
  }

  parseData(data?: string): Student[] {
    if (data == undefined) {
      return [];
    }
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
        while (j < dataArr.length && dataArr[j].substring(0, 2) != '66') {
          if (dataArr[j] != '' && j - i != 6) {
            student.push(dataArr[j]);
          }
          j++;
        }
        i = j;
        allStudentData.push(student);
      }
    }
    for (let student of allStudentData) {
      const studentObj: Student = {
        rin: parseInt(student[0]),
        fname: student[1].split(', ')[0],
        lname: student[1].split(', ')[1],
        email: student[2],
        ewsreason: student[3],
        ewsdate: student[4],
        csubject: student[5],
        ccode: student[6],
        cname: student[7],
        profcomment: student[8],
        dorm: student[10],
        room: student[11],
        emailcount: 0,
        ewscount: 0,
      };
      allStudents.push(studentObj);
    }
    return allStudents;
  }
}
