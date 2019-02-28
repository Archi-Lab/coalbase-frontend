import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningSpaceEditorComponent } from './learning-space-editor.component';

describe('LearningSpaceEditorComponent', () => {
  let component: LearningSpaceEditorComponent;
  let fixture: ComponentFixture<LearningSpaceEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningSpaceEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningSpaceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
