import {Resource} from 'angular4-hal';

export class Comment extends Resource {

  private _attachedEntityId: string;
  private _attributeName: string;
  private _content: string;


  constructor();
  constructor(attachedEntityId: string, attributeName: string, content: string);
  constructor(attachedEntityId?: string, attributeName?: string, content?: string) {
    super();
    this._attachedEntityId = attachedEntityId || '';
    this._attributeName = attributeName || '';
    this._content = content || '';
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

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }
}
