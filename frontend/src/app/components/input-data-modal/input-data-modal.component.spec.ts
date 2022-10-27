import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDataModalComponent } from './input-data-modal.component';

describe('InputDataModalComponent', () => {
  let component: InputDataModalComponent;
  let fixture: ComponentFixture<InputDataModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputDataModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
