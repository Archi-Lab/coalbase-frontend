import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamFormEditorComponent } from './exam-form-editor.component';

describe('ExamFormEditorComponent', () => {
  let component: ExamFormEditorComponent;
  let fixture: ComponentFixture<ExamFormEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamFormEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamFormEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
