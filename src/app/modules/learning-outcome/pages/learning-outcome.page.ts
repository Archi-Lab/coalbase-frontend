import {Component} from "@angular/core";
import {LearningOutcome} from "../../../shared/models/learning-outcome.model";
import {LearningOutcomeService} from "../../../core/services/learning-outcome.service";
import {Router} from "@angular/router";


@Component({
  selector: "app-learning-outcome-view",
  templateUrl: "./learning-outcome.page.html",
  styleUrls: ["./learning-outcome.page.scss"]
})
export class LearningOutcomePage {
  learningOutcomes: LearningOutcome[] = [];

  constructor(private learningOutcomeService: LearningOutcomeService, private router: Router) {
    learningOutcomeService.learningOutcomes.subscribe(learningOutcomes => {
      this.learningOutcomes = learningOutcomes;
    });
  }
}
