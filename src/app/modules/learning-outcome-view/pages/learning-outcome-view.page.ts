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

  constructor(private learningOutcomeService: LearningOutcomeService) {
    learningOutcomeService.learningOutcomes.subscribe(learningOutcomes => this.learningOutcomes = learningOutcomes);
  }
}
