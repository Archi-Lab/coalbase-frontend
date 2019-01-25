import {Competence} from './competence.model';

export interface LearningOutcome {
  id: string;
  competence: Competence;
  tools: string[];
  purpose: string;
}
