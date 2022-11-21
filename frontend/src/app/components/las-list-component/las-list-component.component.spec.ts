import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LasListComponentComponent } from './las-list-component.component';

describe('LasListComponentComponent', () => {
  let component: LasListComponentComponent;
  let fixture: ComponentFixture<LasListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LasListComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LasListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
