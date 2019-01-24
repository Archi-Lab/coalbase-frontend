import {Skill} from './skill.model';

export interface LearningOutcome {
  title: string;
  skill: Skill;
  toolKit: string[];
  purpose: string;
}
