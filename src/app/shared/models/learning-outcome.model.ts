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
}
