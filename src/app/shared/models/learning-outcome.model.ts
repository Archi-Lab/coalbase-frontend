export interface LearningOutcome {
  title: string;
  roles: string[];
  abilities: string[];
  preconditions: string[];
  subAbilities: LearningOutcome[];
  businessGoal: string
}
