import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaResourceComponent } from './la-resource.component';

describe('LaResourceComponent', () => {
  let component: LaResourceComponent;
  let fixture: ComponentFixture<LaResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaResourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
