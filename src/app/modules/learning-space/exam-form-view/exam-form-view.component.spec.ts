import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamFormViewComponent } from './exam-form-view.component';

describe('ExamFormViewComponent', () => {
  let component: ExamFormViewComponent;
  let fixture: ComponentFixture<ExamFormViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamFormViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
