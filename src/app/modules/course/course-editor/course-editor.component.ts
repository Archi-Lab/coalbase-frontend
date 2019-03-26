import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../../../shared/models/course/course.model';
import {FormControl, FormGroup} from '@angular/forms';

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
  
  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log('identify parameter');
      const identifier = params.get('courseIdentifier');
      if (identifier === 'new') {
        // TODO create new Course
      } else if (identifier) {
        // TODO get existing Course
      } else {
        // TODO get first Course
      }
    });
  }
}
