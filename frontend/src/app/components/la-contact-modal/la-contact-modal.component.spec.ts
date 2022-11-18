import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaContactModalComponent } from './la-contact-modal.component';

describe('LaContactModalComponent', () => {
  let component: LaContactModalComponent;
  let fixture: ComponentFixture<LaContactModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaContactModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaContactModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
