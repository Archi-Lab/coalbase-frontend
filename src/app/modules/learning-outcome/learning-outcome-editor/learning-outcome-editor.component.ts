import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LearningOutcomeService} from '../../../core/services/learning-outcome/learning-outcome.service';
import {LearningOutcome} from '../../../shared/models/learning-outcome.model';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-learning-outcome-editor',
  templateUrl: './learning-outcome-editor.component.html',
  styleUrls: ['./learning-outcome-editor.component.scss']
})
export class LearningOutcomeEditorComponent implements OnInit {
  learningOutcome: LearningOutcome = new LearningOutcome();
  readonly taxonomyLevels = [
    {
      backend: 'KNOWLEDGE',
      name: 'Wissen',
      description: 'Die Lernenden geben wieder, was sie vorher gelernt haben.' +
        ' Der Prüfungsstoff musste auswendig gelernt oder geübt werden.'
    },
    {
      backend: 'COMPREHENSION',
      name: 'Verständnis',
      description: 'Die Lernenden erklären z.B. einen Begriff, eine Formel,' +
        ' einen Sachverhalt oder ein Gerät. Ihr Verständnis zeigt sich darin,' +
        ' dass sie das Gelernte auch in einem Kontext präsent haben, der sich ' +
        'vom Kontext unterscheidet, in dem gelernt worden ist. So können die' +
        ' Lernenden z.B. einen Sachverhalt auch umgangssprachlich erläutern' +
        ' oder den Zusammenhang graphisch darstellen.'
    },
    {
      backend: 'APPLICATION',
      name: 'Anwendung',
      description: 'Die Lernenden wenden etwas Gelerntes' +
        ' in einer neuen Situation an.' +
        ' Diese Anwendungssituation ist bisher nicht vorgekommen.'
    },
    {
      backend: 'ANALYSIS',
      name: 'Analyse',
      description: 'Die Lernenden zerlegen Modelle,' +
        ' Verfahren oder anderes in deren Bestandteile.' +
        ' Dabei müssen sie in komplexen Sachverhalten die Aufbauprinzipien' +
        ' oder inneren Strukturen entdecken. Sie erkennen Zusammenhänge.'
    },
    {
      backend: 'SYNTHESIS',
      name: 'Synthese',
      description: 'Die Lernenden zeigen eine konstruktive Leistung.' +
        ' Sie müssen verschiedene Teile zusammenfügen,' +
        ' die sie noch nicht zusammen erlebt oder gesehen haben.' +
        ' Aus ihrer Sicht müssen sie eine schöpferische Leistung erbringen.' +
        ' Das Neue ist aber in der bisherigen Erfahrung' +
        ' oder in der Kenntnis der Lernenden noch nicht vorhanden.'
    },
    {
      backend: 'EVALUATION',
      name: 'Beurteilung',
      description: 'Die Lernenden zeigen eine konstruktive Leistung.' +
        ' Sie müssen verschiedene Teile zusammenfügen,' +
        ' die sie noch nicht zusammen erlebt oder gesehen haben.' +
        ' Aus ihrer Sicht müssen sie eine schöpferische Leistung erbringen.' +
        ' Das Neue ist aber in der bisherigen Erfahrung' +
        ' oder in der Kenntnis der Lernenden noch nicht vorhanden.'
    }
  ];

  learningOutcomeFormGroup = new FormGroup({
    competence: new FormGroup({
      action: new FormControl(''),
      taxonomyLevel: new FormControl('')
    }),
    tools: this.fb.array([]),
    purpose: new FormControl('')
  });

  constructor(private router: Router, private route: ActivatedRoute, private learningOutcomeService: LearningOutcomeService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const identifier = params.get('learningOutcomeIdentifier');
      if (identifier === 'new') {
        this.learningOutcome = new LearningOutcome(
          {action: '', taxonomyLevel: ''},
          [],
          {value: ''},
        );
        this.initializeForm();
      } else if (identifier) {
        this.learningOutcomeService.get(identifier).subscribe(learingOutcome => {
          this.learningOutcome = learingOutcome;
          this.initializeForm();
        });
      } else {
        this.learningOutcomeService.getFirstLearningOutcome().subscribe(firstLearningOutcome => {
          console.log(`${JSON.stringify(firstLearningOutcome)}`);
          this.learningOutcome = firstLearningOutcome;
          this.initializeForm();
        });
      }
    });
  }

  private initializeForm(): void {
    this.actionForm.setValue(this.learningOutcome.competence.action);
    this.taxonomyLevelForm.setValue(this.learningOutcome.competence.taxonomyLevel);
    this.clearToolsFormArray();
    if (this.learningOutcome.tools != null && this.learningOutcome.tools.length > 0) {
      this.learningOutcome.tools.forEach(tool => this.addTool(tool.value));
    } else {
      this.addTool('');
    }

    this.purposeForm.setValue(this.learningOutcome.purpose.value);
  }

  public saveLearningOutcome(): void {
    this.learningOutcome.competence.action = this.actionForm.value;
    this.learningOutcome.competence.taxonomyLevel = this.taxonomyLevelForm.value;

    /*clear everything in the previous tool array*/
    this.learningOutcome.tools = [];
    for (let toolForm of this.toolsFormArray.controls) {
      this.learningOutcome.tools.push({value: toolForm.value});
    }

    this.learningOutcome.purpose = this.purposeForm.value;

    if (this.learningOutcome._links != null && this.learningOutcome._links.hasOwnProperty("self")) {
      this.learningOutcomeService.update(this.learningOutcome).subscribe();
    } else {
      this.learningOutcomeService.create(this.learningOutcome).subscribe(result => {
        const learningOutcome: LearningOutcome = result as LearningOutcome;
        this.router.navigate(['/learning-outcomes', learningOutcome.getIdFromUri()]);
      });
    }

  }

  public deleteLearningOutcome(): void {
    if (this.learningOutcome._links != null && this.learningOutcome._links.hasOwnProperty("self")) {
      this.learningOutcomeService.delete(this.learningOutcome).subscribe(result => this.router.navigate(['/learning-outcomes']));
    } else {
      console.log("not implemented yet!")
    }
  }

  public addTool(value: string): void {
    this.toolsFormArray.push(this.fb.control(value));
  }

  public removeTool(toolsFormIndex: number): void {
    this.toolsFormArray.removeAt(toolsFormIndex);
  }

  private clearToolsFormArray(): void {
    this.toolsFormArray.controls.forEach((value, index) => this.removeTool(index));
  }

  public get toolsFormArray(): FormArray {
    return this.learningOutcomeFormGroup.get('tools') as FormArray;
  }

  public get competenceFormGroup(): FormGroup {
    return this.learningOutcomeFormGroup.get('competence') as FormGroup;
  }

  public get actionForm(): FormControl {
    return this.competenceFormGroup.get('action') as FormControl;
  }

  public get taxonomyLevelForm(): FormControl {
    return this.competenceFormGroup.get('taxonomyLevel') as FormControl;
  }

  public get purposeForm(): FormControl {
    return this.learningOutcomeFormGroup.get('purpose') as FormControl;
  }

}
