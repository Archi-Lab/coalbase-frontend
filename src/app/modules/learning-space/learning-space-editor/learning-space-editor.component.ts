import {Component, OnInit, ViewChild} from "@angular/core";
import {ExamFormEditorComponent} from "../exam-form-editor/exam-form-editor.component";
import {WebLinkFormEditorComponent} from "../web-link-form-editor/webLink-form-editor.component";
import {Course} from "../../../shared/models/course/course.model";
import {LearningSpace} from "../../../shared/models/learning-space/learning-space.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog, MatSnackBar} from "@angular/material";
import {LearningSpaceService} from "../../../core/services/learning-space/learning-space.service";
import {CourseService} from "../../../core/services/course/course.service";
import {LearningOutcomeService} from "../../../core/services/learning-outcome/learning-outcome.service";
import {ResourceService} from "../../../core/services/resource/resource.service";
import {LearningOutcome} from "../../../shared/models/learning-outcome/learning-outcome.model";
import {LearningSpaceDeleteDialogComponent} from "../learning-space-delete-dialog/learning-space-delete-dialog.component";

@Component({
  selector: 'app-learning-space-editor',
  templateUrl: './learning-space-editor.component.html',
  styleUrls: ['./learning-space-editor.component.scss']
})
export class LearningSpaceEditorComponent implements OnInit {

  /*Props of the component*/
  public course: Course = new Course();
  public learningSpace: LearningSpace = new LearningSpace();
  public learningSpaceForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required)
  });

  /*Props for component visibility*/
  public showLearningOutcomeEditor: boolean = false;
  public showLearningSpaceEditor: boolean = true;

  /*Child components*/
  @ViewChild(ExamFormEditorComponent)
  private examFormEditorComponent: ExamFormEditorComponent | undefined;
  @ViewChild(WebLinkFormEditorComponent)
  private webLinkFormEditor: WebLinkFormEditorComponent | undefined;

  /*Input of child components*/
  public learningSpaceUUID: string | undefined;
  public learningOutcomeIsNew: boolean = false;


  constructor(
    private readonly location: Location,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly learningSpaceService: LearningSpaceService,
    private readonly courseService: CourseService,
    private readonly learningOutcomeService: LearningOutcomeService,
    private readonly resourceService: ResourceService,
    private readonly snack: MatSnackBar,
    private readonly dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.initializeCourse();
    this.initializeLearningSpace();
  }

  /* Form group getters */
  public get learningSpaceTitle(): FormControl {
    return this.learningSpaceForm.get("title") as FormControl;
  }

  /* edit methods for a course */
  private saveLearningSpaceToCourse(learningSpace: LearningSpace): void {
    if (this.course) {
      this.course.updateRelation('learningSpaces', learningSpace).subscribe();
      this.course.learningSpaces.push(learningSpace);
    }
  }

  private deleteLearningSpaceFromCourse(learningSpace: LearningSpace): void {
    if (this.course) {
      const indexToRemove: number = this.course.learningSpaces.findIndex(learningSpaceSearch => learningSpaceSearch._links.self.href === learningSpace._links.self.href);
      this.course.learningSpaces = this.course.learningSpaces.slice(indexToRemove, 1);
    }
  }

  /* edit methods for a learning space*/
  private async saveLearningSpace(): Promise<void> {
    if (this.learningSpace) {
      this.learningSpace.title = this.learningSpaceTitle.value;

      if (this.examFormEditorComponent) {
        this.learningSpace.examForm = this.examFormEditorComponent.saveExamFormFromForm();
      }

      let result: LearningSpace;
      if (this.learningSpace._links
        && this.learningSpace._links.self) {
        result = await this.learningSpaceService.update(this.learningSpace).toPromise() as LearningSpace;
      } else {
        result = await this.learningSpaceService.create(this.learningSpace).toPromise() as LearningSpace;
      }
      if (result) {

        this.course.updateRelation("learningSpaces", result).subscribe();
        this.course.learningSpaces.push(result);
        await this.saveLearningOutcome();

        if (this.webLinkFormEditor) {
          this.webLinkFormEditor.saveWebLinkResources(result.getIdFromUri());
        }

        this.navigateBackToOverview();
      } else {
        this.snack.open("Fehler beim Speichern des Lernraums", undefined, {duration: 2000});
      }
    }
  }

  private deleteLearningSpace(): void {
    if (this.learningSpace) {
      const dialogRef = this.dialog.open(LearningSpaceDeleteDialogComponent, {
        data: {learningSpaceTitle: this.learningSpace.title}
      });
      dialogRef.afterClosed().subscribe(shouldDelete => {
        if (shouldDelete) {
          this.learningSpaceService.delete(this.learningSpace).subscribe(
            () => {
              this.snack.open("Lernraum gelöscht", undefined, {duration: 2000});
              this.deleteLearningSpaceFromCourse(this.learningSpace);
              this.router.navigate(['../'], {relativeTo: this.route});
            },
            () => this.snack.open("Lernraum konnte nicht gelöscht werden. Besteht eventuell noch eine Abhängigkeit auf diesen Lernraum?", undefined, {duration: 2000})
          );
        }
      });
    }
  }

  /* edit methods for a learning outcome*/
  public async saveLearningOutcome(): Promise<void> {
    if (this.learningSpace) {
      if (this.learningSpace.learningOutcome) {
        if (this.learningSpace.learningOutcome._links
          && this.learningSpace.learningOutcome._links.self) {
          this.learningSpace.learningOutcome = await
            this.learningOutcomeService.update(this.learningSpace.learningOutcome as LearningOutcome).toPromise() as LearningOutcome;
        } else {
          this.learningSpace.learningOutcome = await
            this.learningOutcomeService.create(this.learningSpace.learningOutcome as LearningOutcome).toPromise() as LearningOutcome;
          await this.learningSpace.addRelation('learningOutcome', this.learningSpace.learningOutcome as LearningOutcome).toPromise();
        }
      }
    }
  }

  public deleteLearningOutcome(): void {
    if (this.learningSpace) {
      if (this.learningSpace._links !== undefined
        && this.learningSpace._links.learningOutcome !== undefined) {
        const learningOutcome = this.learningSpace.learningOutcome as LearningOutcome;
        this.learningSpace.deleteRelation("learningOutcome", learningOutcome).subscribe();
      }

      this.learningSpace.learningOutcome = undefined;
      this.learningOutcomeIsNew = true;
    }
  }

  /* Methods to control visibility of child component */
  private navigateBackToOverview() {
    this.router.navigate(['../'], {relativeTo: this.route});
    this.snack.open("Lernraum gespeichert", undefined, {duration: 2000});
  }

  public openLearningOutcomeEditor(): void {
    this.showLearningOutcomeEditor = true;
    this.showLearningSpaceEditor = false;
  }

  public closeLearningOutcomeEditor(learningOutcome: LearningOutcome | undefined): void {
    if (learningOutcome !== undefined) {
      if (this.learningSpace) {
        this.learningSpace.learningOutcome = learningOutcome;
      }
    }
    this.showLearningOutcomeEditor = false;
    this.showLearningSpaceEditor = true;
  }


  /* initialize LearningSpace in ngOnInit */
  private initializeForm(learningSpace: LearningSpace): void {
    this.learningSpaceTitle.setValue(learningSpace.title);
    // TODO das kann man verbessern!
    this.learningOutcomeIsNew = !(learningSpace.learningOutcome && learningSpace.learningOutcome._links);
  }

  private async initializeLearningSpace(): Promise<void> {
    const learningSpaceUuid: string = await this.extractLearningSpaceUuidFromRouter();

    if (learningSpaceUuid) {
      if (learningSpaceUuid === "new") {
        this.createLearningSpace();
      } else {
        this.setLearningSpaceByUuid(learningSpaceUuid);
      }
    }
  }

  private createLearningSpace(): void {
    this.learningSpace = new LearningSpace('');
    this.initializeForm(this.learningSpace);
  }

  private setLearningSpaceByUuid(learningSpaceUuid: string): void {
    this.learningSpaceService.get(learningSpaceUuid).subscribe(learningSpace => {
      this.learningSpace = learningSpace;
      this.setLearningOutcomeToLearningSpace(this.learningSpace);
      this.initializeForm(this.learningSpace);
    });
  }

  private setLearningOutcomeToLearningSpace(learningSpace: LearningSpace): void {
    learningSpace.getRelation(LearningOutcome, 'learningOutcome').subscribe((learningOutcome: LearningOutcome) => {
      learningSpace.learningOutcome = learningOutcome;
    });
  }

  private extractLearningSpaceUuidFromRouter(): Promise<string> {
    return new Promise<string>((resolve) => {
      this.route.paramMap.subscribe(params => {
        resolve(params.get('learningSpaceIdentifier') as string);
      });
    });
  }

  /* initialize Course in ngOnInit */
  private initializeCourse(): void {
    this.extractCourseUuidFromRouter().then(courseUuid => {
      this.setCourseByUuid(courseUuid);
    }).catch(error => {
      console.error(`LearningSpaceEditor: cannot get course: ${error}`);
    });
  }

  private extractCourseUuidFromRouter(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (this.route.parent) {
        this.route.parent.paramMap.subscribe(parentParams => {
          resolve(parentParams.get('courseIdentifier') as string);
        });
      } else {
        reject();
      }
    });
  }

  private setCourseByUuid(courseUuid: string) {
    this.courseService.get(courseUuid).subscribe(course => {
      this.course = course;
    });
  }
}
