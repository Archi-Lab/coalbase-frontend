import {Component, Input, OnInit} from '@angular/core';
import {LearningOutcome} from "../../../shared/models/learning-outcome/learning-outcome.model";
import {Competence} from "../../../shared/models/learning-outcome/competence.model";
import {Requirement} from "../../../shared/models/learning-outcome/requirement.model";
import {Ability} from "../../../shared/models/learning-outcome/ability.model";
import {TAXONOMY_LEVELS} from "../../../shared/models/taxonomy/taxonomy.const";

@Component({
  selector: 'app-learning-outcome-view',
  templateUrl: './learning-outcome-view.component.html',
  styleUrls: ['./learning-outcome-view.component.scss']
})
export class LearningOutcomeViewComponent implements OnInit {

  @Input() learningOutcome: LearningOutcome | undefined = undefined;

  constructor() { }

  ngOnInit() {

  }

  // Taxonomy
  private buildCompetenceWithTaxonomy(competence: Competence): string {
    return this.buildStringWithTaxonomy(competence.action, competence.taxonomyLevel);
  }

  private buildRequirementWithTaxonomy(requirement: Requirement): string {
    return this.buildStringWithTaxonomy(requirement.value, requirement.taxonomyLevel);
  }

  private buildAbilityWithTaxonomy(ability: Ability): string {
    return this.buildStringWithTaxonomy(ability.value, ability.taxonomyLevel);
  }

  private buildStringWithTaxonomy(value: string, taxonomyID: string): string {
    return value + ' (' + this.getTaxonomyLevelByID(taxonomyID) + ')';
  }

  private getTaxonomyLevelByID(taxonomyID: string): number {
    for(let i=0; i < TAXONOMY_LEVELS.length; i++){
      if (TAXONOMY_LEVELS[i].backend == taxonomyID) {
        return i+1;
      }
    }
    return -1;
  }
}
