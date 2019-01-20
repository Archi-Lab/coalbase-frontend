import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {LearningOutcome} from "../../shared/models/learning-outcome.model";

/*SAMPLE DATA*/
const learningOutcomes: LearningOutcome[] = [
  {
    title: "UseCase Übersicht",
    roles: ["Anforderungsanalyst", "Softwarearchitekt", "Softwareentwickler"],
    abilities: ["eine Übersicht über alle Use Cases, basierend auf meinem Anforderungstext identifizieren", "als Use-Case-Diagramme spezifizieren"],
    preconditions: [
      {
        title: "Namenskonventionen für UseCases",
        roles: [],
        abilities: ["mich an Namenskonventionen für UseCases erinnern"],
        preconditions: [],
        subAbilities: [],
        businessGoal: ""
      }
    ],
    subAbilities: [
      {
        title: "Anforderungsblöcke Gruppieren",
        roles: [],
        abilities: ["den Anforderungstext in Blöcke von zusammenhängenden Aktivitäten gruppiere"],
        preconditions: [],
        subAbilities: [],
        businessGoal: ""
      }
    ],
    businessGoal: "eine erste Übersicht der Anwendungsfälle (Nutzerperspektive) meines Systems vorliegen habe."
  },
  {
    title: " Definition einer Komponentenstruktur",
    roles: ["Softwarearchitekt", "Softwareentwickler"],
    abilities: ["durch Use Cases, fachliches Datenmodell und Clustering eine erste Komponentenstruktur"],
    preconditions: undefined,
    subAbilities: undefined,
    businessGoal: "einen Startpunkt für die weitere Entwurfsarbeit habe"
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
