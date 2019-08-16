import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentService} from "../../../core/services/comment/comment.service";
import {Comment} from "../../../shared/models/comment/comment.model";
import {KeyCloakUser} from "../../../security/KeycloakUser";

@Component({
  selector: 'app-comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.scss']
})
export class CommentEditorComponent implements OnInit {

  @Input() attachedEntityId: string | undefined;
  @Input() attributeName: string | undefined;
  @Input() componentName: string | undefined;
  commentsFormGroup: FormGroup = new FormGroup({
    comments: new FormArray([])
  });

  editMode: boolean = false;


  constructor(private readonly commentService: CommentService,
              private user: KeyCloakUser) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  public addComment(comment: string, commentResource?: Comment): void {
    const formGroup: FormGroup = new FormGroup({
      content: new FormControl(comment, Validators.required),
      object: new FormControl(commentResource)
    });
    this.comments.push(formGroup);
  }

  public removeComment(index: number): void {

    const formGroup = this.comments.controls[index] as FormGroup;
    const comment = formGroup.get("object") as FormControl;
    if (comment && comment.value) {
      this.commentService.delete(comment.value).subscribe();
    }
    this.comments.removeAt(index);
  }

  public async saveComments(attachedEntityId: string) : Promise<void> {
    this.attachedEntityId = attachedEntityId;
    const comments: Comment[] = [];

    this.clearEmptyComments();

    this.comments.controls.forEach(commentsForm => {
      const comment = commentsForm.get("content") as FormControl;
      const commentObject = commentsForm.get("object") as FormControl;
      if (this.attachedEntityId && this.attributeName) {
        if (commentObject.value) {
          const commentResource: Comment = commentObject.value;
          commentResource.content = comment.value;
          commentResource.attachedEntityId = this.attachedEntityId;
          commentResource.attributeName = this.attributeName;
          comments.push(commentResource);
        } else {
          comments.push(new Comment(this.attachedEntityId, this.attributeName, {userName: '', firstName: this.user.getFirstName(), lastName: this.user.getLastName()}, comment.value));
        }
      }
    });

    for (let commentResource of comments) {
      if (commentResource._links && commentResource._links.self) {
        await this.commentService.update(commentResource).toPromise();
      } else {
        await this.commentService.create(commentResource).toPromise();
      }
    }
  }

  public clearEmptyComments() {
    for (let i = this.comments.controls.length-1; i >= 0; i--) {
      const comment = this.comments.controls[i].get("content") as FormControl;
      if (this.isCommentEmpty(comment.value)) {
        this.removeComment(i);
      }
    }
  }

  public switchEditMode() {
    if (this.editMode) {
      this.editMode = false;
      this.clearEmptyComments();
    } else {
      this.editMode = true;
      if (this.comments.controls.length == 0) {
        this.addComment("");
      }
    }
  }

  public get comments(): FormArray {
    return this.commentsFormGroup.get("comments") as FormArray;
  }

  private isCommentEmpty(comment: string): boolean {
    return comment === "";
  }

  private initializeForm() {
    if (this.attachedEntityId && this.attributeName) {
      this.commentService.findByAttachedEntityIdAndAttributeName(this.attachedEntityId, this.attributeName).subscribe(comments => {
        if (comments && comments.length > 0) {
          comments.forEach(comment => {
            this.addComment(comment.content, comment);
          });
        }
      });
    }
  }

  private buildCommentAuthorFullName(comment: Comment): string {
    if (comment === null) {
      return '?';
    }
    return comment.author.firstName + ' ' + comment.author.lastName;
  }

  private buildCommentAuthorShortName(comment: Comment): string {
    if (comment === null) {
      return '?';
    }

    let returnValue = '';
    if (comment.author.firstName.length > 0) {
      returnValue += comment.author.firstName.charAt(0) + '.';
    } else {
      returnValue += "?."
    }
    if (comment.author.lastName.length > 0) {
      returnValue += comment.author.lastName.charAt(0) + '.';
    } else {
      returnValue += "?."
    }
    return returnValue;
  }
}
