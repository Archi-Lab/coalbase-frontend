import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LearningOutcomeService} from '../../../core/services/learning-outcome/learning-outcome.service';
import {LearningOutcome} from '../../../shared/models/learning-outcome/learning-outcome.model';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar} from "@angular/material";
import {TAXONOMY_LEVELS} from "../../../shared/models/taxonomy/taxonomy.const";

@Component({
  selector: 'app-learning-outcome-editor',
  templateUrl: './learning-outcome-editor.component.html',
  styleUrls: ['./learning-outcome-editor.component.scss']
})
export class LearningOutcomeEditorComponent implements OnChanges {
  learningOutcome: LearningOutcome = new LearningOutcome();

  @Input() learningOutcomeReference: string | undefined = undefined;
  @Output() closeComponent: EventEmitter<LearningOutcome> = new EventEmitter<LearningOutcome>();
  taxonomyLevels = TAXONOMY_LEVELS;

  learningOutcomeFormGroup = new FormGroup({
    role: new FormControl(''),
    competence: new FormGroup({
      action: new FormControl(''),
      taxonomyLevel: new FormControl('')
    }),
    requirements: this.fb.array([]),
    abilities: this.fb.array([]),
    purposes: this.fb.array([]),
  });

  constructor(private readonly router: Router,
              private readonly route: ActivatedRoute,
              private readonly snack: MatSnackBar,
              private readonly learningOutcomeService: LearningOutcomeService,
              private readonly fb: FormBuilder) {
  }

  ngOnChanges(): void {
    console.log("TEST: " + this.learningOutcomeReference);
    if (this.learningOutcomeReference === undefined) {
      console.log("test");
    }
    if (this.learningOutcomeReference === "new") {
      this.learningOutcome = new LearningOutcome(
        {value: ''},
        {action: '', taxonomyLevel: ''},
        [],
        [],
        []
      );
      this.initializeForm();
    } else if (this.learningOutcomeReference) {
      this.learningOutcomeService.getBySelfLink(this.learningOutcomeReference).subscribe(learningOutcome => {
        this.learningOutcome = learningOutcome;
        this.initializeForm();
      });
    }
  }

  private initializeForm(): void {

    console.log(JSON.stringify(this.learningOutcome));

    // Role
    this.roleFormControl.setValue(this.learningOutcome.role.value);

    // Competence
    this.competenceFormGroup.controls.action.setValue(this.learningOutcome.competence.action);
    this.competenceFormGroup.controls.taxonomyLevel.setValue(this.learningOutcome.competence.taxonomyLevel);

    // Requirements
    this.clearRequirementsFormArray();
    if (this.learningOutcome.requirements != null && this.learningOutcome.requirements.length > 0) {
      this.learningOutcome.requirements.forEach(requirement => this.addRequirement(requirement.value, requirement.taxonomyLevel));
    } else {
      this.addRequirement('', TAXONOMY_LEVELS[0].name);
    }

    // Abilities
    this.clearAbilitiesFormArray();
    if (this.learningOutcome.abilities != null && this.learningOutcome.abilities.length > 0) {
      this.learningOutcome.abilities.forEach(ability => this.addAbility(ability.value, ability.taxonomyLevel));
    } else {
      this.addAbility('', TAXONOMY_LEVELS[0].name);
    }

    // Purposes
    this.clearPurposesFormArray();
    if (this.learningOutcome.purposes != null && this.learningOutcome.purposes.length > 0) {
      this.learningOutcome.purposes.forEach(purpose => this.addPurpose(purpose.value, purpose.taxonomyLevel));
    } else {
      this.addPurpose('', TAXONOMY_LEVELS[0].name);
    }
  }

  public saveLearningOutcome(): void {
    // Role
    this.learningOutcome.role = this.roleFormControl.value;

    // Competence
    this.learningOutcome.competence.action = this.competenceFormGroup.controls.action.value;
    this.learningOutcome.competence.taxonomyLevel = this.competenceFormGroup.controls.taxonomyLevel.value;

    // Requirements
    this.learningOutcome.requirements = [];
    for (const requirementForm of this.requirementsFormArray.controls as FormGroup[]) {
      this.learningOutcome.requirements.push({
        value: requirementForm.controls.requirement.value,
        taxonomyLevel: requirementForm.controls.taxonomyLevel.value
      });
    }

    // Abilities
    this.learningOutcome.abilities = [];
    for (const abilityForm of this.abilitiesFormArray.controls as FormGroup[]) {
      this.learningOutcome.abilities.push({
        value: abilityForm.controls.ability.value,
        taxonomyLevel: abilityForm.controls.taxonomyLevel.value
      });
    }

    // Purposes
    this.learningOutcome.purposes = [];
    for (const purposeForm of this.purposesFormArray.controls as FormGroup[]) {
      this.learningOutcome.purposes.push({
        value: purposeForm.controls.purpose.value,
        taxonomyLevel: purposeForm.controls.taxonomyLevel.value
      });
    }

    if (this.learningOutcome._links != null && this.learningOutcome._links.hasOwnProperty('self')) {
      this.closeLearningOutcomeEditor(this.learningOutcome);
      this.snack.open("Learning Outcome bearbeitet", undefined, {duration: 2000});
    } else {
      this.closeLearningOutcomeEditor(this.learningOutcome);
      this.snack.open("Learning Outcome gespeichert", undefined, {duration: 2000});

    }
  }

  public deleteLearningOutcome(): void {
    if (this.learningOutcome._links != null && this.learningOutcome._links.hasOwnProperty('self')) {
      this.learningOutcomeService.delete(this.learningOutcome).subscribe(
        () => {
          this.closeLearningOutcomeEditor(undefined);
          this.snack.open("Learning Outcome gelöscht", undefined, {duration: 2000});
        },
        () => this.snack.open("Learning Outcome konnte nicht gelöscht werden. Besteht eventuell noch eine Abhängigkeit auf diesen Learning Outcome?", undefined, {duration: 2000})
      );
    } else {
      console.log('not implemented yet!');
    }
  }


  // Role Form
  public get roleFormControl(): FormControl {
    return this.learningOutcomeFormGroup.get('role') as FormControl;
  }

  // Competence Form
  public get competenceFormGroup(): FormGroup {
    return this.learningOutcomeFormGroup.get('competence') as FormGroup;
  }

  // Requirement Forms
  private clearRequirementsFormArray(): void {
    this.requirementsFormArray.controls = [];
  }

  public get requirementsFormArray(): FormArray {
    return this.learningOutcomeFormGroup.get('requirements') as FormArray;
  }

  public addRequirement(requirement: string, taxonomyLevel: string): void {
    this.requirementsFormArray.push(new FormGroup({
      requirement: new FormControl(requirement),
      taxonomyLevel: new FormControl(taxonomyLevel)
    }));
  }

  public removeRequirement(formIndex: number): void {
    this.requirementsFormArray.removeAt(formIndex);
  }

  // Ability Forms
  private clearAbilitiesFormArray(): void {
    this.abilitiesFormArray.controls = [];
  }

  public get abilitiesFormArray(): FormArray {
    return this.learningOutcomeFormGroup.get('abilities') as FormArray;
  }

  public addAbility(ability: string, taxonomyLevel: string): void {
    this.abilitiesFormArray.push(new FormGroup({
      ability: new FormControl(ability),
      taxonomyLevel: new FormControl(taxonomyLevel)
    }));
  }

  public removeAbility(formIndex: number): void {
    this.abilitiesFormArray.removeAt(formIndex);
  }

  // Purpose Forms
  private clearPurposesFormArray(): void {
    this.purposesFormArray.controls = [];
  }

  public get purposesFormArray(): FormArray {
    return this.learningOutcomeFormGroup.get('purposes') as FormArray;
  }

  public addPurpose(purpose: string, taxonomyLevel: string): void {
    this.purposesFormArray.push(new FormGroup({
      purpose: new FormControl(purpose),
      taxonomyLevel: new FormControl(taxonomyLevel)
    }));
  }

  public removePurpose(formIndex: number): void {
    this.purposesFormArray.removeAt(formIndex);
  }

  private closeLearningOutcomeEditor(learningOutcomeReference: LearningOutcome | undefined) {
    this.closeComponent.emit(learningOutcomeReference);
  }
}
