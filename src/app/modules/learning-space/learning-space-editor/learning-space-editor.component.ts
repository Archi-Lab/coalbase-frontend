import {Component, OnInit} from '@angular/core';
import {LearningSpace} from "../../../shared/models/learning-space.model";
import {ActivatedRoute, Router} from "@angular/router";
import {LearningOutcomeService} from "../../../core/services/learning-outcome/learning-outcome.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {LearningSpaceService} from "../../../core/services/learning-space/learning-space.service";
import {LearningOutcome} from "../../../shared/models/learning-outcome.model";

@Component({
  selector: 'app-learning-space-editor',
  templateUrl: './learning-space-editor.component.html',
  styleUrls: ['./learning-space-editor.component.scss']
})
export class LearningSpaceEditorComponent implements OnInit {

  learningSpace: LearningSpace = new LearningSpace("Test");

  learningOutcomes: LearningOutcome[] = [];
  learningSpaces: LearningSpace[] = [];

  learningSpaceForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    learningOutcome: new FormControl(''),
    requirement: new FormControl('')
  });

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private learningSpaceService: LearningSpaceService, private learningOutcomeService: LearningOutcomeService) {
  }

  ngOnInit() {
  }

  private initializeForm(learningSpace: LearningSpace): void {
    this.titleForm.setValue(learningSpace.title);
    if (learningSpace.learningOutcome != null && learningSpace.learningOutcome._links != null) {
      this.learningOutcomeForm.setValue(learningSpace.learningOutcome._links.self.href);
    }
    if (learningSpace.requirement != null && learningSpace.requirement._links != null) {
      this.requirementForm.setValue(learningSpace.requirement._links.self.href);
    }
  }

  private saveLearningSpaceFromForm(): void {
    this.learningSpace.title = this.learningSpaceForm.value;
    this.learningOutcomeService.getBySelfLink(this.learningOutcomeForm.value).subscribe(learningOutcome => this.learningSpace.learningOutcome = learningOutcome);
    this.learningSpaceService.getBySelfLink(this.requirementForm.value).subscribe(requirement => this.learningSpace.requirement = requirement);

  }

  public saveLearningSpace(): void {
    /* TODO use when service is done!
    this.saveLearningSpaceFromForm();

    if (this.learningSpace._links != null && this.learningSpace._links.self != null) {
      this.learningSpaceService.update(this.learningSpace);
    } else {
      this.learningSpaceService.create(this.learningSpace);
    }


    this.learningSpace.addRelation("learningOutcome", this.learningSpace.learningOutcome);
    this.learningSpace.addRelation("requirement", this.learningSpace.requirement);
    */

  }

  public deleteLearningSpace(): void {
    this.learningSpaceService.delete(this.learningSpace);
  }

  public get titleForm(): FormControl {
    return this.learningSpaceForm.get('title') as FormControl;
  }

  public get learningOutcomeForm(): FormControl {
    return this.learningSpaceForm.get('learningOutcome') as FormControl;
  }

  public get requirementForm(): FormControl {
    return this.learningSpaceForm.get('requirement') as FormControl;
  }

}
