import { Component, OnInit } from '@angular/core';
import {PredefinedExamFormService} from "../../../core/services/predefined-exam-form/predefined-exam-form.service";
import {PredefinedExamForm} from "../../../shared/models/predefined-exam-form/predefined-exam-form.model";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-exam-form-editor',
  templateUrl: './exam-form-editor.component.html',
  styleUrls: ['./exam-form-editor.component.scss']
})
export class ExamFormEditorComponent implements OnInit {

  predefinedExamForms : PredefinedExamForm[] = [];

  examFormForm: FormGroup = new FormGroup({
    template: new FormControl(''),
    type: new FormControl(''),
    description: new FormControl(''),
    schedules: this.fb.array([]),
    duration : new FormGroup({
      minValue: new FormControl(''),
      maxValue: new FormControl(''),
      unit: new FormControl('')
    })
  });


  constructor(
    private readonly predefinedExamFormService: PredefinedExamFormService,
    private readonly fb: FormBuilder) {
  }

  ngOnInit() {
    this.predefinedExamFormService.listResource.subscribe(predefinedExamForms => {
      this.predefinedExamForms = predefinedExamForms;
    });
  }

  public get templateForm(): FormControl {
    return this.examFormForm.get('template') as FormControl;
  }

  public get typeForm(): FormControl {
    return this.examFormForm.get('type') as FormControl;
  }

  public get descriptionForm(): FormControl {
    return this.examFormForm.get('description') as FormControl;
  }

  public get schedulesFormArray(): FormArray {
    return this.examFormForm.get('schedules') as FormArray;
  }

  public get durationForm(): FormGroup {
    return this.examFormForm.get('duration') as FormGroup;
  }

  public get durationMinValueForm(): FormControl {
    return this.durationForm.get('minValue') as FormControl;
  }

  public get durationMaxValueForm(): FormControl {
    return this.durationForm.get('maxValue') as FormControl;
  }

  public get durationUnitForm(): FormControl {
    return this.durationForm.get('unit') as FormControl;
  }
}
