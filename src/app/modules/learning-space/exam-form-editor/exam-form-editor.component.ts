import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {PredefinedExamFormService} from "../../../core/services/predefined-exam-form/predefined-exam-form.service";
import {PredefinedExamForm} from "../../../shared/models/predefined-exam-form/predefined-exam-form.model";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ExamForm} from "../../../shared/models/learning-space/exam-form.model";

@Component({
  selector: 'app-exam-form-editor',
  templateUrl: './exam-form-editor.component.html',
  styleUrls: ['./exam-form-editor.component.scss']
})
export class ExamFormEditorComponent implements OnInit, OnChanges {

  @Input() examForm: ExamForm | undefined = undefined;

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

  ngOnChanges() {
    if (this.examForm === undefined) {
      this.initializeForm(new ExamForm());
    } else {
      this.initializeForm(this.examForm);
    }
  }

  private getPredefinedExamFormBySelfLink(href: string) : PredefinedExamForm | undefined {
    for (let predefinedExamForm of this.predefinedExamForms) {
      if (predefinedExamForm._links.self.href === href) {
        return predefinedExamForm;
      }
    }
    return undefined;
  }

  private usePredefinedExamForm(href: string) {
    const predefinedExamForm : PredefinedExamForm | undefined = this.getPredefinedExamFormBySelfLink(href);
    if (predefinedExamForm) {
      const examForm: ExamForm = this.convertPredefinedExamFormToExamForm(predefinedExamForm);
      this.initializeForm(examForm);
    }
  }

  private convertPredefinedExamFormToExamForm(predefinedExamForm: PredefinedExamForm): ExamForm {
    const examForm : ExamForm = new ExamForm();

    examForm.type = predefinedExamForm.type;
    examForm.description = predefinedExamForm.description;
    examForm.schedules = predefinedExamForm.schedules;
    examForm.duration = predefinedExamForm.duration;

    return examForm;
  }

  private initializeForm(examForm: ExamForm) {
    // Type / Description
    this.typeForm.setValue(examForm.type);
    this.descriptionForm.setValue(examForm.description);

    // Schedules
    this.clearSchedulesFormArray();
    if (examForm.schedules != null && examForm.schedules.length > 0) {
      examForm.schedules.forEach(schedule => this.addSchedule(schedule.value));
    } else {
      this.addSchedule('');
    }

    // Duration
    this.durationMinValueForm.setValue(examForm.duration.minValue);
    this.durationMaxValueForm.setValue(examForm.duration.maxValue);
    this.durationUnitForm.setValue(examForm.duration.unit);
  }

  public saveExamFormFromForm() : ExamForm {
    const examForm: ExamForm = new ExamForm();

    // Type / Description
    examForm.type = this.typeForm.value;
    examForm.description = this.descriptionForm.value;

    // Schedules
    for (const scheduleForm of this.schedulesFormArray.controls as FormControl[]) {
      if (scheduleForm.value !== '') {
        examForm.schedules.push({
          value: scheduleForm.value
        });
      }
    }

    // Duration
    examForm.duration.minValue = this.durationMinValueForm.value;
    examForm.duration.maxValue = this.durationMaxValueForm.value;
    examForm.duration.unit = this.durationUnitForm.value;

    return examForm;
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

  // Schedules Forms
  public get schedulesFormArray(): FormArray {
    return this.examFormForm.get('schedules') as FormArray;
  }

  private clearSchedulesFormArray(): void {
    this.schedulesFormArray.controls = [];
  }

  public addSchedule(schedule: string): void {
    this.schedulesFormArray.push(new FormControl(schedule));
  }

  public removeSchedule(formIndex: number): void {
    this.schedulesFormArray.removeAt(formIndex);
  }
}
