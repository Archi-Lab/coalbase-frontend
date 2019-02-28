import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningSpaceOverviewComponent } from './learning-space-overview.component';

describe('LearningSpaceOverviewComponent', () => {
  let component: LearningSpaceOverviewComponent;
  let fixture: ComponentFixture<LearningSpaceOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningSpaceOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningSpaceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
