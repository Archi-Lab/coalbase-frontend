import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {LearningOutcome} from "../../shared/models/learning-outcome.model";

/*SAMPLE DATA*/
const learningOutcomes: LearningOutcome[] = [
  {
    title: "UseCase Übersicht",
    skill: {
      description: "Kann ich mich an Namenskonventionen für UseCases erinnern",
      taxonomyLevel: 2
    },
    toolKit: [
      "Indem ich die einzelnen Elemente aus der UML-Definition für Anwendungsfälle in einem UML-Editor, wie Modellio benutze"
    ],
    purpose: "So, dass ich eine erste Übersicht der Anwendungsfälle (Nutzerperspektive) meines Systems vorliegen habe."
  },
  {
    title: "Definition einer Komponentenstruktur",
    skill: {
      description: "Kann ich durch Use Cases, fachliches Datenmodell und Clustering eine erste Komponentenstruktur erstellen",
      taxonomyLevel: 2
    },
    toolKit: [
      "Indem ich die einzelnen Elemente aus der UML-Definition für Anwendungsfälle in einem UML-Editor, wie Modellio benutze"
    ],
    purpose: "So, dass ich einen Startpunkt für die weitere Entwurfsarbeit habe."
  }
];

@Injectable()
export class LearningOutcomeService {

  private _learningOutcomes: BehaviorSubject<LearningOutcome[]>;

  constructor() {
    this._learningOutcomes = new BehaviorSubject<LearningOutcome[]>([]);
    this.initializeLearningOutcomes();
  }

  private initializeLearningOutcomes(): void {
    this._learningOutcomes.next(learningOutcomes);
  }

  get learningOutcomes(): Observable<LearningOutcome[]> {
    return this._learningOutcomes.asObservable();
  }
}
