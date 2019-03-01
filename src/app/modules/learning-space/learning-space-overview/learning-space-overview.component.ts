import {Component, OnInit} from '@angular/core';
import {LearningSpace} from "../../../shared/models/learning-space.model";
import {LearningOutcome} from "../../../shared/models/learning-outcome.model";

@Component({
  selector: 'app-learning-space-overview',
  templateUrl: './learning-space-overview.component.html',
  styleUrls: ['./learning-space-overview.component.scss']
})
export class LearningSpaceOverviewComponent implements OnInit {

  space1 = new LearningSpace("space1");
  space2 = new LearningSpace("space2", new LearningOutcome({
    action: "action1",
    taxonomyLevel: "LEVEL1"
  }, [{value: "tool1"}, {value: "tool2"}], {value: "purpose1"}), this.space1);
  space3 = new LearningSpace("space3", new LearningOutcome({
    action: "action1",
    taxonomyLevel: "LEVEL1"
  }, [{value: "tool1"}, {value: "tool2"}], {value: "purpose1"}), this.space2);
  space4 = new LearningSpace("space4", new LearningOutcome({
    action: "action1",
    taxonomyLevel: "LEVEL1"
  }, [{value: "tool1"}, {value: "tool2"}], {value: "purpose1"}), this.space3);
  space5 = new LearningSpace("space5", new LearningOutcome({
    action: "action1",
    taxonomyLevel: "LEVEL1"
  }, [{value: "tool1"}, {value: "tool2"}], {value: "purpose1"}), this.space4);
  space6 = new LearningSpace("space6", new LearningOutcome({
    action: "action1",
    taxonomyLevel: "LEVEL1"
  }, [{value: "tool1"}, {value: "tool2"}], {value: "purpose1"}), this.space5);

  sampleLearningSpaces: LearningSpace[] = [
    this.space2, this.space3, this.space6, this.space1, this.space4, this.space5
  ];

  sortedLearningSpaces: LearningSpace[] = [];

  constructor() {
  }

  ngOnInit() {
    this.space1._links = {};
    this.space1._links.self = {};
    this.space1._links.self.href = "http://test.io/123uahsdj1331";
    this.sortedLearningSpaces = this.sortLearningSpaces(this.sampleLearningSpaces);
  }

  private sortLearningSpaces(unsortedLearningSpaces: LearningSpace[]): LearningSpace[] {
    const sortedLearningSpaces: LearningSpace[] = [];

    let index: number = 0;
    while (index < unsortedLearningSpaces.length) {

      if (sortedLearningSpaces.length === 0) {
        sortedLearningSpaces.push(unsortedLearningSpaces.filter(learningSpace => learningSpace.isFirst())[0]);
      } else {
        sortedLearningSpaces.push(unsortedLearningSpaces.filter(learningSpace => learningSpace.isRequirement(sortedLearningSpaces[sortedLearningSpaces.length - 1]))[0]);
      }
      index++;
    }

    return sortedLearningSpaces;
  }

}
