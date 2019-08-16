import {Resource} from 'angular4-hal';
import {CommentAuthor} from "./comment-author.model";

export class Comment extends Resource {

  private _attachedEntityId: string;
  private _attributeName: string;
  private _author: CommentAuthor;
  private _content: string;

  private _created: Date;
  private _modified: Date;


  constructor();
  constructor(attachedEntityId: string, attributeName: string, author: CommentAuthor, content: string);
  constructor(attachedEntityId?: string, attributeName?: string, author?: CommentAuthor, content?: string) {
    super();
    this._attachedEntityId = attachedEntityId || '';
    this._attributeName = attributeName || '';
    this._author = author || {userName: '', firstName: '', lastName: ''};
    this._content = content || '';
    this._created = new Date();
    this._modified = new Date();
  }

  public getIdFromUri(): string {
    if (this._links != null && this._links.hasOwnProperty('self')) {
      const selfUri: string = this._links.self.href;
      return selfUri.substring(selfUri.lastIndexOf('/') + 1, selfUri.length).trim();
    } else {
      return '';
    }
  }

  get attachedEntityId(): string {
    return this._attachedEntityId;
  }

  set attachedEntityId(value: string) {
    this._attachedEntityId = value;
  }

  get attributeName(): string {
    return this._attributeName;
  }

  set attributeName(value: string) {
    this._attributeName = value;
  }

  get author(): CommentAuthor {
    return this._author;
  }

  set author(value: CommentAuthor) {
    this._author = value;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  get created(): Date {
   return this._created;
  }

  set created(value: Date) {
    this._created = value;
  }

  get modified(): Date {
    return this._modified;
  }

  set modified(value: Date) {
    this._modified = value;
  }
}
