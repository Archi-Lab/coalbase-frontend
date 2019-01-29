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
      'indem sie das Makro- und Mikro-Umfeld (insb. Kunden und Kaufverhalten)des relevanten Markts',
      'so wie das eigene Unternehmen analysieren (auch mit Marktforschung), daraus die Elemente einer Marketingstrategie ableiten',
      'und Konsequenzen für die verschiedenen Bereiche der Marketingpolitik entwerfen'
    ],
    purpose: 'um Produkte, Preise, Kommunikation und den Vertrieb bewusst marktorientiert zu gestalten.'
  },
  {
    id: '739d0737-419a-417d-8676-04ad691bf296',
    competence: {
      action: 'Die Studierenden können einen thematisch vorgegebenen funktionstüchtigen Spielprototypen kriteriengeleitet entwickeln,',
      taxonomyLevel: 'APPLY'
    },
    tools: [
      'indem Game Development Environment (z.B. Unity 3D, Gamemaker) angewendet, Programmiersprachen (z.B. Javascript, C#) genutzt',
      'und der Umgang mit Game Assets gelernt wird'
    ],
    purpose: 'um in Folgeveranstaltungen Spielprototypen mit wachsender Komplexität entwickeln zu können.'
  },
  {
    id: 'a613327b-2c9c-4361-b753-da7117a6c12b',
    competence: {
      action: 'Die Studierenden können pharmazeutische Darreichungsformen herstellen',
      taxonomyLevel: 'SYNTHESIS'
    },
    tools: [
      'indem sie den regulatorischen Rahmen der geltenden Arzneibücher auslegen, ' +
      'plausible Formulierungen der Auswahl geeigneter Hilfsstoffe zusammenstellen und ' +
      'die technischen Details gängiger pharmazeutischer Herstellungsmethoden berücksichtigen,'
    ],
    purpose: 'um später im Praktikum stabile Arzneimittel für chemische und biologische Wirkstoffmoleküle herzustellen.'
  },
  {
    id: 'd373ff5d-6681-4d83-bb94-3a275ff82ecb',
    competence: {
      action: 'Die Studierenden können eine kriteriengeleitete (Eignung, Kosten, Energieverbrauch) Aggregatauswahl' +
        'für einen vorgegebenen Kontext des Transports und Lagerns von Stoffen treffen,',
      taxonomyLevel: 'SYNTHESIS'
    },
    tools: [
      'indem sie tabellarisch Alternativen des Aggregats im Rahmen eines anwendungsbezogenen Stärken-/\n' +
      'Schwächenprofils bewerten, ',
      'die Vorauswahl durch Schätzroutinen und vorgestellte Formeln verifizieren',
      'und dabei Gefahrenchecks bezüglich Staubexplosionen durchführen,'
    ],
    purpose: 'um eine verfahrenstechnisch optimale Geräteauswahl zu treffen, ' +
      'Risiken zu minimieren und die Entscheidungen betrieblich durchsetzen zu können.'
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
