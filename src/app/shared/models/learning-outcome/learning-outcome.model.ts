import {Competence} from './competence.model';
import {Resource} from 'angular4-hal';
import {Purpose} from './purpose.model';
import {Tool} from './tool.model';

export class LearningOutcome extends Resource {
  competence: Competence;
  tools: Tool[];
  purpose: Purpose;

  constructor(competence?: Competence, tools?: Tool[], purpose?: Purpose, links?: any) {
    super();
    this.competence = competence || {action: '', taxonomyLevel: ''};
    this.tools = tools || [];
    this.purpose = purpose || {value: ''};
    this._links = links;
  }

  public getIdFromUri(): string {
    const selfUri: string = this._links.self.href;
    return selfUri.substring(selfUri.lastIndexOf('/') + 1, selfUri.length).trim();
  }

  public isEmpty(): boolean {
    return (this.competence == null || this.competence.action.length <= 0)
      || (this.tools == null || this.tools.length <= 0)
      || (this.purpose == null || this.purpose.value.length <= 0);
  }

}
