export interface LearningOutcome {
  title: string;
  roles: string[];
  abilities: string[];
  preconditions: LearningOutcome[];
  subAbilities: LearningOutcome[];
  businessGoal: string
}
