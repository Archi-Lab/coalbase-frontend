import {Competence} from './competence.model';
import {Resource} from 'angular4-hal';
import {Purpose} from './purpose.model';
import {Ability} from './ability.model';
import {Role} from "./role.model";
import {Requirement} from "./requirement.model";

export class LearningOutcome extends Resource {
  role: Role;
  competence: Competence;
  requirements: Requirement[];
  abilities: Ability[];
  purposes: Purpose[];

  constructor(role?: Role, competence?: Competence, requirements?: Requirement[], abilities?: Ability[], purposes?: Purpose[], links?: any) {
    super();
    this.role = role || {value: ''};
    this.competence = competence || {action: '', taxonomyLevel: ''};
    this.requirements = requirements || [];
    this.abilities = abilities || [];
    this.purposes = purposes || [];
    this._links = links;
  }

  public getIdFromUri(): string | undefined {
    if (this._links && this._links.self) {
      const selfUri: string = this._links.self.href;
      return selfUri.substring(selfUri.lastIndexOf('/') + 1, selfUri.length).trim();
    } else {
      return undefined;
    }
  }

  public isEmpty(): boolean {
    return (this.competence == null || this.competence.action.length <= 0)
      || (this.abilities == null || this.abilities.length <= 0)
      || (this.purposes == null || this.purposes.length <= 0);
  }

}
