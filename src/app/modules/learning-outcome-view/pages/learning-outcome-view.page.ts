import {Component} from "@angular/core";
import {LearningOutcome} from "../../../shared/models/learning-outcome.model";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material";

@Component({
  selector: "app-learning-outcome-view",
  templateUrl: "./learning-outcome-view.page.html",
  styleUrls: ["./learning-outcome-view.page.scss"]
})
export class LearningOutcomeViewPage {
  learningOutcomes: LearningOutcome[] = [
    {
      title: "My first Learning-Outcome",
      roles: ["SoftwareDeveloper"],
      abilities: ["i can view a learning-outcome"],
      preconditions: ["know how to develope angular"],
      subAbilities: [
        {
          title: "My second Learning-Outcome",
          roles: ["SoftwareDeveloper"],
          abilities: ["i can view a learning-outcome"],
          preconditions: ["know how to develope angular"],
          subAbilities: [],
          businessGoal: "so i can see a learning-outcome"
        }
      ],
      businessGoal: "so i can see a learning-outcome"
    }
  ];

  nestedTreeControl: NestedTreeControl<LearningOutcome>;
  nestedDataSource: MatTreeNestedDataSource<LearningOutcome>;

  constructor() {
    this.nestedTreeControl = new NestedTreeControl<LearningOutcome>((learningOutcome: LearningOutcome) => learningOutcome.subAbilities);

    this.nestedDataSource = new MatTreeNestedDataSource();
    this.nestedDataSource.data = this.learningOutcomes;
  }

  hasNestedChild = (_: number, nodeData: LearningOutcome) => nodeData.subAbilities;

}
