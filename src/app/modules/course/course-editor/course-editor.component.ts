import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../../../shared/models/course/course.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CourseService} from '../../../core/services/course/course.service';

@Component({
  selector: 'app-course-editor',
  templateUrl: './course-editor.component.html',
  styleUrls: ['./course-editor.component.scss']
})
export class CourseEditorComponent implements OnInit {
  course: Course = new Course();

  courseForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private courseService: CourseService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const identifier = params.get('courseIdentifier');
      if (identifier === 'new') {
        this.course = new Course('');
        this.initalizeForm(this.course);
      } else if (identifier) {
        this.courseService.get(identifier).subscribe(course => {
          this.course = course;
        });
      }
    });
  }

  private initalizeForm(course: Course): void {
    this.titleForm.setValue(course.title);
    this.descriptionForm.setValue(course.description);
  }

  public get titleForm(): FormControl {
    return this.courseForm.get('title') as FormControl;
  }

  public get descriptionForm(): FormControl {
    return this.courseForm.get('description') as FormControl;
  }

  saveCourse() {
    console.log('Save Course');
    // TODO save course
  }

  deleteCourse() {
    console.log('Delete Course');
    // TODO delete course
  }
}
