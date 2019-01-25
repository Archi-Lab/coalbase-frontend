import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {LearningOutcome} from '../../shared/models/learning-outcome.model';

/*SAMPLE DATA*/
/*
TODO implement new sample data
{
    "competence": {"action": "Die Studierenden können Marketingentscheidungen informationsgestützt treffen", "taxonomyLevel":"SYNTHESIS"},
    "tools": [
        {"value":"das Makro- und Mikroumfeld des relevanten Marktes so wie das eigenen Unternehmen analysieren"},
        {"value":"Konsequenzen für die verschiedenen Bereiche der Marketingpolitik entwerfen"}
    ],
    "purpose": {"value": "Produkte, Preise, Kommunikation und den Vertrieb bewusst marktorientiert zu gestalten"}
}
 */
const learningOutcomes: LearningOutcome[] = [
  {
    id: 1,
    title: 'UseCase Übersicht',
    skill: {
      description: 'Kann ich mich an Namenskonventionen für UseCases erinnern',
      taxonomyLevel: 2
    },
    toolKit: [
      'Indem ich die einzelnen Elemente aus der UML-Definition für Anwendungsfälle in einem UML-Editor, wie Modellio benutze'
    ],
    purpose: 'So, dass ich eine erste Übersicht der Anwendungsfälle (Nutzerperspektive) meines Systems vorliegen habe.'
  },
  {
    id: 2,
    title: 'Definition einer Komponentenstruktur',
    skill: {
      description: 'Kann ich durch Use Cases, fachliches Datenmodell und Clustering eine erste Komponentenstruktur erstellen',
      taxonomyLevel: 2
    },
    toolKit: [
      'Indem ich die einzelnen Elemente aus der UML-Definition für Anwendungsfälle in einem UML-Editor, wie Modellio benutze'
    ],
    purpose: 'So, dass ich einen Startpunkt für die weitere Entwurfsarbeit habe.'
  },
  {
    id: 3,
    title: 'Definition eines langen und komplexen Learning Outcome, welches repräsentativ für alle anderen steht.',
    skill: {
      description: 'Bin ich ein sehr kompetentes Learning Outcome',
      taxonomyLevel: 6
    },
    toolKit: [
      'Eine wichtiges Werkzeug',
      'Ein viel wichtigeres Werkzeug',
      'Noch viel wichtigeres Werkzeug',
      'Total wichtiges Werkzeug'
    ],
    purpose: 'So, dass ich ein Learning Outcome für neue Themengebiete bin'
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

  public learningOutcome(identifier: string): LearningOutcome {
    // TODO refactor to return a Observable
    return this._learningOutcomes.getValue().filter(learningOutcome => learningOutcome.id.toString() === identifier)[0];
  }

  get firstlearningOutcome(): LearningOutcome {
    // TODO refactor to return a Observable
    return this._learningOutcomes.getValue()[0];
  }
}
