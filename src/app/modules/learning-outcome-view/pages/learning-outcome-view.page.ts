import {Component} from "@angular/core";
import {LearningOutcome} from "../../../shared/models/learning-outcome.model";
import {LearningOutcomeService} from "../../../core/services/learning-outcome.service";

@Component({
  selector: "app-learning-outcome-view",
  templateUrl: "./learning-outcome-view.page.html",
  styleUrls: ["./learning-outcome-view.page.scss"]
})
export class LearningOutcomeViewPage {
  learningOutcomes: LearningOutcome[] = [];
  selectedLearningOutcome: LearningOutcome = {title: "", skill: {description: "", taxonomyLevel: 0}, toolKit: [], purpose: ""};

  constructor(private learningOutcomeService: LearningOutcomeService) {
    learningOutcomeService.learningOutcomes.subscribe(learningOutcomes => {
      this.learningOutcomes = learningOutcomes;
      if (this.learningOutcomes.length > 0) {
        this.selectedLearningOutcome = this.learningOutcomes[0];
      }
    });
  }
  selectLearningOutcome(learningOutcome: LearningOutcome) {
    if (learningOutcome.title
        && learningOutcome.skill
        && learningOutcome.skill.description
        && learningOutcome.skill.taxonomyLevel
        && learningOutcome.toolKit
        && learningOutcome.toolKit.length > 0
        && learningOutcome.purpose) {
      this.selectedLearningOutcome = learningOutcome;
    } else {
      console.log("Selected LearningOutcome is not valid, there are missing attributes: " + JSON.stringify(learningOutcome));
    }
  }
}
