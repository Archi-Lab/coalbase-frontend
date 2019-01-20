import {Component} from "@angular/core";
import {LearningOutcome} from "../../../shared/models/learning-outcome.model";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material";
import {LearningOutcomeService} from "../../../core/services/learning-outcome.service";

@Component({
  selector: "app-learning-outcome-view",
  templateUrl: "./learning-outcome-view.page.html",
  styleUrls: ["./learning-outcome-view.page.scss"]
})
export class LearningOutcomeViewPage {

  nestedTreeControl: NestedTreeControl<LearningOutcome>;
  nestedDataSource: MatTreeNestedDataSource<LearningOutcome>;

  constructor(private learningOutcomeService: LearningOutcomeService) {
    this.nestedTreeControl = new NestedTreeControl<LearningOutcome>(this.getChildren);

    this.nestedDataSource = new MatTreeNestedDataSource();
    learningOutcomeService.learningOutcomes.subscribe(learningOutcomes => this.nestedDataSource.data = learningOutcomes);
  }

  private getChildren = (learningOutcome: LearningOutcome) => {
    return [].concat(learningOutcome.subAbilities ? learningOutcome.subAbilities : [],
      learningOutcome.preconditions ? learningOutcome.preconditions : []);
  };

  hasSubAbilities = (_: number, nodeData: LearningOutcome) => nodeData.subAbilities;

}
