import {Skill} from './skill.model';

export interface LearningOutcome {
  id: number;
  title: string;
  skill: Skill;
  toolKit: string[];
  purpose: string;
}
