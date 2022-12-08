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
  @Output() onDeleteEvent: EventEmitter<Student> = new EventEmitter();

  errors: null | string[] = null;

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
      lacomment: this.student.lacomment,
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['student']) {
      const update = changes['student']['currentValue'];

      const patch: EditFormPatch = {
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
    for (const field in this.editStudentForm.value) {
      const value: any =
        this.editStudentForm.value[
          field as keyof typeof this.editStudentForm.value
        ];

      if (
        this.editStudentForm.value[
          field as keyof typeof this.editStudentForm.value
        ] == 'undefined'
      ) {
        delete this.student[field as Key];
      } else {
        this.student[field as Key] = value;
      }
    }

    this.requestService.putStudent(this.student).subscribe({
      next: (res: string) => {
        this.errors = null;
        console.log(res);
        this.requestService.getStudents();
        this.onSubmitEvent.emit();
      },
      error: (err) => {
        console.log(err.error.message);
        this.errors = [err.error.message];
      },
      complete: () => console.info('Updated logic finished'),
    });
  }

  onDeleteEWS() {
    this.onDeleteEvent.emit(this.student);
  }
}
