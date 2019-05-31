import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {LearningSpace} from '../../../shared/models/learning-space/learning-space.model';
import {ActivatedRoute, Router} from '@angular/router';
import {LearningOutcomeService} from '../../../core/services/learning-outcome/learning-outcome.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LearningSpaceService} from '../../../core/services/learning-space/learning-space.service';
import {LearningOutcome} from '../../../shared/models/learning-outcome/learning-outcome.model';
import {Course} from '../../../shared/models/course/course.model';
import {CourseService} from '../../../core/services/course/course.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {LearningSpaceDeleteDialogComponent} from '../learning-space-delete-dialog/learning-space-delete-dialog.component';

@Component({
  selector: 'app-learning-space-editor',
  templateUrl: './learning-space-editor.component.html',
  styleUrls: ['./learning-space-editor.component.scss']
})
export class LearningSpaceEditorComponent implements OnInit {

  showLearningOutcomeEditor: boolean = false;
  showLearningSpaceEditor: boolean = true;

  course: Course = new Course();
  learningSpace: LearningSpace = new LearningSpace();
  learningOutcomeIsNew: boolean = false;
  learningOutcomeSelfRef: string = "new";
  learningSpaceForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
  });

  constructor(
    private readonly location: Location,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly snack: MatSnackBar,
    private readonly learningSpaceService: LearningSpaceService,
    private readonly courseService: CourseService,
    private readonly learningOutcomeService: LearningOutcomeService,
    private readonly dialog: MatDialog) {
  }

  ngOnInit() {

    if (this.route.parent) {
      this.route.parent.paramMap.subscribe(parentParams => {
        const courseIdentifier: string = parentParams.get('courseIdentifier') as string;
        this.courseService.get(courseIdentifier).subscribe(course => {
          this.course = course;
        });
      });
    }
    this.route.paramMap.subscribe(params => {
      const learningSpaceIdentifier: string = params.get('learningSpaceIdentifier') as string;

      if (learningSpaceIdentifier === 'new') {
        this.learningSpace = new LearningSpace('');
        this.initializeForm(this.learningSpace);
      } else if (learningSpaceIdentifier) {
        this.learningSpaceService.get(learningSpaceIdentifier).subscribe(learningSpace => {
          this.learningSpace = learningSpace;
          this.learningSpace.getRelation(LearningOutcome, 'learningOutcome').subscribe(
            (learningOutcome: LearningOutcome) => {
              this.learningSpace.learningOutcome = learningOutcome;
              this.learningSpace.getRelation(LearningSpace, 'requirement').subscribe(
                (requirement: LearningSpace) => {
                  this.learningSpace.requirement = requirement;
                  this.initializeForm(this.learningSpace);
                },
                (error) => this.initializeForm(this.learningSpace));
            }, (error) => {
              this.initializeForm(this.learningSpace)
            });
        });
      }
    });
  }

  private initializeForm(learningSpace: LearningSpace): void {
    this.titleForm.setValue(learningSpace.title);
    if (learningSpace.learningOutcome !== undefined && learningSpace.learningOutcome._links !== undefined) {
      this.learningOutcomeSelfRef = learningSpace.learningOutcome._links.self.href;
      this.learningOutcomeIsNew = false;
    } else {
      this.learningOutcomeSelfRef = "new";
      this.learningOutcomeIsNew = true;
    }
  }

  private saveLearningSpaceFromForm() {
    this.learningSpace.title = this.titleForm.value;
  }

  private addRelationToCourse(learningSpace: LearningSpace): void {
    this.course.updateRelation('learningSpaces', learningSpace).subscribe();
    this.course.learningSpaces.push(learningSpace);
  }

  private addRelationsToLearningSpace(learningSpace: LearningSpace): void {
    learningSpace.addRelation('learningOutcome', learningSpace.learningOutcome as LearningOutcome)
      .subscribe();
  }


  private removeLearningSpaceInCourse(learningSpace: LearningSpace): void {
    const indexToRemove: number = this.course.learningSpaces.findIndex(learningSpaceSearch => learningSpaceSearch._links.self.href === learningSpace._links.self.href);
    this.course.learningSpaces = this.course.learningSpaces.slice(indexToRemove, 1);
  }

  public saveLearningSpace(): void {
    this.saveLearningSpaceFromForm();
    this.saveLearningOutcome().then(() => {
      if (this.learningSpace._links != null && this.learningSpace._links.self != null) {
        this.updateLearningSpace();
      } else {
        this.createLearningSpace();
      }
    }).catch(() => this.snack.open("Fehler beim Speichern des Learning Outcomes", undefined, {duration: 2000}));
  }

  private createLearningSpace(): void {
    this.learningSpaceService.create(this.learningSpace).subscribe(
      learningSpace => {
        const learningSpaceUpdated: LearningSpace = learningSpace as LearningSpace;
        this.addRelationsToLearningSpace(learningSpaceUpdated);
        this.addRelationToCourse(learningSpaceUpdated);
        this.router.navigate(['../'], {relativeTo: this.route});
        this.snack.open("Lernraum gespeichert", undefined, {duration: 2000});
      }, () => this.snack.open("Fehler beim Speichern des Lernraums", undefined, {duration: 2000}));
  }

  private updateLearningSpace(): void {
    this.learningSpaceService.update(this.learningSpace).subscribe(
      learningSpace => {
        const learningSpaceUpdated: LearningSpace = learningSpace as LearningSpace;
        this.addRelationsToLearningSpace(learningSpaceUpdated);
        this.router.navigate(['../'], {relativeTo: this.route});
        this.snack.open("Lernraum bearbeitet", undefined, {duration: 2000});
      }, () => this.snack.open("Fehler beim Speichern des Lernraums", undefined, {duration: 2000}));
  }

  public saveLearningOutcome(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.learningOutcomeIsNew) {
        this.learningOutcomeService.create(this.learningSpace.learningOutcome as LearningOutcome).subscribe(res => {
          this.learningSpace.learningOutcome = res as LearningOutcome;
          resolve();
        }, () => reject());
      } else {
        this.learningOutcomeService.update(this.learningSpace.learningOutcome as LearningOutcome).subscribe(
          () => resolve(),
          () => reject()
        );
      }
    });
  }

  public deleteLearningSpace(): void {
    this.openDeleteDialog();
  }

  public backToPreviousPage() {
    this.location.back();
  }

  public get titleForm(): FormControl {
    return this.learningSpaceForm.get('title') as FormControl;
  }

  private openDeleteDialog() {
    const dialogRef = this.dialog.open(LearningSpaceDeleteDialogComponent, {
      data: {learningSpaceTitle: this.learningSpace.title}
    });
    dialogRef.afterClosed().subscribe(shouldDelete => {
      if (shouldDelete) {
        this.learningSpaceService.delete(this.learningSpace).subscribe(
          () => {
            this.snack.open("Lernraum gelöscht", undefined, {duration: 2000});
            this.removeLearningSpaceInCourse(this.learningSpace);
            this.router.navigate(['../'], {relativeTo: this.route});
          },
          () => this.snack.open("Lernraum konnte nicht gelöscht werden. Besteht eventuell noch eine Abhängigkeit auf diesen Lernraum?", undefined, {duration: 2000})
        );
      }
    });
  }

  public deleteLearningOutcome(): void {
    const learningOutcome = this.learningSpace.learningOutcome as LearningOutcome;
    this.learningSpace.deleteRelation("learningOutcome", learningOutcome).subscribe(() => {
      this.learningOutcomeService.delete(learningOutcome).subscribe(() => {
        this.learningSpace.learningOutcome = undefined;
        this.learningOutcomeSelfRef = "new";
        this.learningOutcomeIsNew = true;
      });
    });

  }

  public openLearningOutcomeEditor(): void {
    this.showLearningOutcomeEditor = true;
    this.showLearningSpaceEditor = false;
  }

  public closeLearningOutcomeEditor(learningOutcome: LearningOutcome | undefined): void {
    if (learningOutcome !== undefined) {
      // Update LearningOutcome
      this.learningSpace.learningOutcome = learningOutcome;
    }
    this.showLearningOutcomeEditor = false;
    this.showLearningSpaceEditor = true;
  }
}
