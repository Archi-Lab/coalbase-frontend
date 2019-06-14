import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningOutcomeViewComponent } from './learning-outcome-view.component';

describe('LearningOutcomeViewComponent', () => {
  let component: LearningOutcomeViewComponent;
  let fixture: ComponentFixture<LearningOutcomeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningOutcomeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningOutcomeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
