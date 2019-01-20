import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {LearningOutcome} from "../../shared/models/learning-outcome.model";

/*SAMPLE DATA*/
const learningOutcomes: LearningOutcome[] = [
  {
    title: "My first Learning-Outcome",
    roles: ["SoftwareDeveloper"],
    abilities: ["i can view a learning-outcome"],
    preconditions: [
      {
        title: "My second Learning-Outcome",
        roles: ["SoftwareDeveloper"],
        abilities: ["i can view a learning-outcome"],
        preconditions: [],
        subAbilities: [],
        businessGoal: "so i can see a learning-outcome"
      }
    ],
    subAbilities: [
      {
        title: "My second Learning-Outcome",
        roles: ["SoftwareDeveloper"],
        abilities: ["i can view a learning-outcome"],
        preconditions: [],
        subAbilities: [],
        businessGoal: "so i can see a learning-outcome"
      }
    ],
    businessGoal: "so i can see a learning-outcome"
  },
  {
    title: "My first Learning-Outcome",
    roles: ["SoftwareDeveloper"],
    abilities: ["i can view a learning-outcome"],
    preconditions: undefined,
    subAbilities: undefined,
    businessGoal: "so i can see a learning-outcome"
  }
];

@Injectable()
export class LearningOutcomeService {

  private _learningOutcomes: BehaviorSubject<LearningOutcome[]>;

  constructor() {
    this._learningOutcomes = new BehaviorSubject([]);
    this.initializeLearningOutcomes();
  }

  private initializeLearningOutcomes(): void {
    this._learningOutcomes.next(learningOutcomes);
  }

  get learningOutcomes(): Observable<LearningOutcome[]> {
    return this._learningOutcomes.asObservable();
  }
}
