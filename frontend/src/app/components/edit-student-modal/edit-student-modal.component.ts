import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Student } from '../../interfaces/student';
import { EditFormPatch } from '../../interfaces/edit-form-patch';
import { GlobalVariable } from 'src/app/globals';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-edit-student-modal',
  templateUrl: './edit-student-modal.component.html',
  styleUrls: ['./edit-student-modal.component.css'],
})
export class EditStudentModalComponent implements OnInit {
  statuses: string[] = GlobalVariable.statuses;

  @Input() student!: Student;
  @Output() onSubmitEvent: EventEmitter<boolean> = new EventEmitter();

  editStudentForm = new FormGroup({
    assignedla: new FormControl(''),
    status: new FormControl(''),
    lacomment: new FormControl(''),
    // meetingTime: new FormControl(''),
  });

  constructor(private requestService: RequestsService) {}

  ngOnInit(): void {
    this.editStudentForm.patchValue({
      assignedla: this.student.assignedla,
      status: this.student.status,
      laComment: this.student.lacomment,
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['student']) {
      var update = changes['student']['currentValue'];

      var patch: EditFormPatch = {
        status: update['status'] ? update['status'] : undefined,
        lacomment: update['lacomment'],
        assignedla: update['assignedla'] ? update['assignedla'] : undefined,
      };

      this.editStudentForm.patchValue(patch);
    }
  }

  onSubmitClose() {
    this.onSubmitEvent.emit();
  }

  onSubmit<Key extends keyof Student>() {
    for (var field in this.editStudentForm.value) {
      const value: Student[Key] = this.editStudentForm.value[field];

      if (this.editStudentForm.value[field] == 'undefined') {
        delete this.student[field as Key];
      } else {
        this.student[field as Key] = value;
      }
    }

    this.requestService.putStudent(this.student).subscribe((res: String) => {
      console.log(res);
    });
    this.onSubmitEvent.emit();
  }
}
