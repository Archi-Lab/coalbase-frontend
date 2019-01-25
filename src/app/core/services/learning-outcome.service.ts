import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {LearningOutcome} from '../../shared/models/learning-outcome.model';

const learningOutcomes: LearningOutcome[] = [
  {
    id: '3b5957ea-3643-441d-bc96-a3d8f2b6e712',
    competence: {
      action: 'Die Studierenden können Marketingentscheidungen informationsgestützt treffen',
      taxonomyLevel: 'SYNTHESIS'
    },
    tools: [
      'das Makro- und Mikroumfeld des relevanten Marktes so wie das eigenen Unternehmen analysieren',
      'Konsequenzen für die verschiedenen Bereiche der Marketingpolitik entwerfen'
    ],
    purpose: 'Produkte, Preise, Kommunikation und den Vertrieb bewusst marktorientiert zu gestalten'
  },
  {
    id: '739d0737-419a-417d-8676-04ad691bf296',
    competence: {
      action: 'Die Studierenden machen dinge',
      taxonomyLevel: 'SYNTHESIS'
    },
    tools: [
      'das Makro- und Mikroumfeld des relevanten Marktes so wie das eigenen Unternehmen analysieren',
      'Konsequenzen für die verschiedenen Bereiche der Marketingpolitik entwerfen'
    ],
    purpose: 'Produkte, Preise, Kommunikation und den Vertrieb bewusst marktorientiert zu gestalten'
  },
  {
    id: 'a613327b-2c9c-4361-b753-da7117a6c12b',
    competence: {
      action: 'Die Studierenden machen dinge',
      taxonomyLevel: 'SYNTHESIS'
    },
    tools: [
      'das Makro- und Mikroumfeld des relevanten Marktes so wie das eigenen Unternehmen analysieren',
      'Konsequenzen für die verschiedenen Bereiche der Marketingpolitik entwerfen'
    ],
    purpose: 'Produkte, Preise, Kommunikation und den Vertrieb bewusst marktorientiert zu gestalten'
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

  public learningOutcome(identifier: string): Observable<LearningOutcome> {
    return of(this._learningOutcomes.getValue().filter(learningOutcome => learningOutcome.id === identifier)[0]);
  }

  get firstLearningOutcome(): Observable<LearningOutcome> {
    return of(this._learningOutcomes.getValue()[0]);
  }
}
