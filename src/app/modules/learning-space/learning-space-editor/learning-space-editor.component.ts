import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {LearningSpace} from '../../../shared/models/learning-space/learning-space.model';
import {ActivatedRoute, Router} from '@angular/router';
import {LearningOutcomeService} from '../../../core/services/learning-outcome/learning-outcome.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
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

  course: Course = new Course();
  learningSpace: LearningSpace = new LearningSpace();
  learningOutcomes: LearningOutcome[] = [];
  learningSpaces: LearningSpace[] = [];

  learningSpaceForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    learningOutcome: new FormControl('')
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
            });
        });
      }
    });
    this.learningOutcomeService.getAll().subscribe(learningOutcomes => this.learningOutcomes = learningOutcomes);
    this.learningSpaceService.getAll().subscribe(learningSpaces => this.learningSpaces = learningSpaces);
  }

  private initializeForm(learningSpace: LearningSpace): void {
    this.titleForm.setValue(learningSpace.title);
    if (learningSpace.learningOutcome != null && learningSpace.learningOutcome._links != null) {
      this.learningOutcomeForm.setValue(learningSpace.learningOutcome._links.self.href);
    }
  }

  private saveLearningSpaceFromForm(): void {
    this.learningSpace.title = this.titleForm.value;
    this.learningOutcomeService.getBySelfLink(this.learningOutcomeForm.value).subscribe(
      learningOutcome => this.learningSpace.learningOutcome = learningOutcome);
  }

  private addRelationToCourse(learningSpace: LearningSpace): void {
    this.course.updateRelation('learningSpaces', learningSpace).subscribe();
    this.course.learningSpaces.push(learningSpace);
  }

  private addRelationsToLearningSpace(learningSpace: LearningSpace): void {
    learningSpace.addRelation('learningOutcome', learningSpace.learningOutcome)
      .subscribe();
  }


  private removeLearningSpaceInCourse(learningSpace: LearningSpace): void {
    const indexToRemove: number = this.course.learningSpaces.findIndex(learningSpaceSearch => learningSpaceSearch._links.self.href === learningSpace._links.self.href);
    this.course.learningSpaces = this.course.learningSpaces.slice(indexToRemove, 1);
  }

  public saveLearningSpace(): void {
    this.saveLearningSpaceFromForm(); // TODO method has to wait for learning outcome to be loaded

    if (this.learningSpace._links != null && this.learningSpace._links.self != null) {
      this.learningSpaceService.update(this.learningSpace).subscribe(
        learningSpace => {
          const learningSpaceUpdated: LearningSpace = learningSpace as LearningSpace;
          this.addRelationsToLearningSpace(learningSpaceUpdated);
          this.router.navigate(['../'], {relativeTo: this.route});
        });
      this.snack.open("Lernraum bearbeitet", undefined, { duration: 2000});
    } else {
      this.learningSpaceService.create(this.learningSpace).subscribe(
        learningSpace => {
          const learningSpaceUpdated: LearningSpace = learningSpace as LearningSpace;
          this.addRelationsToLearningSpace(learningSpaceUpdated);
          this.addRelationToCourse(learningSpaceUpdated);
          this.router.navigate(['../'], {relativeTo: this.route});
        });
      this.snack.open("Lernraum gespeichert", undefined, { duration: 2000});
    }
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

  public get learningOutcomeForm(): FormControl {
    return this.learningSpaceForm.get('learningOutcome') as FormControl;
  }

  private openDeleteDialog() {
    const dialogRef = this.dialog.open(LearningSpaceDeleteDialogComponent, {
      data: {learningSpaceTitle: this.learningSpace.title}
    });
    dialogRef.afterClosed().subscribe(shouldDelete => {
      if (shouldDelete) {
        this.learningSpaceService.delete(this.learningSpace).subscribe(
          () => {
            this.snack.open("Lernraum gelöscht", undefined, { duration: 2000});
            this.removeLearningSpaceInCourse(this.learningSpace);
            this.router.navigate(['../'], {relativeTo: this.route});
          },
          () => this.snack.open("Lernraum konnte nicht gelöscht werden. Besteht eventuell noch eine Abhängigkeit auf diesen Lernraum?", undefined, { duration: 2000})
        );
      }
    });
  }


}
