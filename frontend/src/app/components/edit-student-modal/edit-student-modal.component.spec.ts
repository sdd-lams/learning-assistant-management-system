import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentModalComponent } from './edit-student-modal.component';

describe('EditStudentModalComponent', () => {
  let component: EditStudentModalComponent;
  let fixture: ComponentFixture<EditStudentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStudentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStudentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
