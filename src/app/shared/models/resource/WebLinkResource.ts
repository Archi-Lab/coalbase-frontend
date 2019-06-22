import {Resource} from "angular4-hal";

export class WebLinkResource extends Resource {

  private _referenceId: string;
  private _description: string;
  private _webLink: string;

  constructor();
  constructor(referenceId: string, webLink: string, description?: string);
  constructor(referenceId?: string, webLink?: string, description?: string) {
    super();
    this._referenceId = referenceId || "";
    this._description = description || "";
    this._webLink = webLink || "";
  }

  public getIdFromUri(): string {
    if (this._links != null && this._links.hasOwnProperty('self')) {
      const selfUri: string = this._links.self.href;
      return selfUri.substring(selfUri.lastIndexOf('/') + 1, selfUri.length).trim();
    } else {
      return '';
    }
  }

  public set referenceId(referenceId: string) {
    this._referenceId = referenceId;
  }

  public set description(description: string) {
    this._description = description;
  }

  public set webLink(webLink: string) {
    this._webLink = webLink;
  }

  public get referenceId(): string {
    return this._referenceId;
  }

  public get description(): string {
    return this._description;
  }

  public get webLink(): string {
    return this._webLink;
  }
}
