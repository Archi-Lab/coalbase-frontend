import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningSpaceListOverviewComponent } from './learning-space-list-overview.component';

describe('LearningSpaceListOverviewComponent', () => {
  let component: LearningSpaceListOverviewComponent;
  let fixture: ComponentFixture<LearningSpaceListOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningSpaceListOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningSpaceListOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
