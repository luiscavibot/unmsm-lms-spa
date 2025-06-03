export interface Evaluation {
  id: string;
  blockId: string;
  title: string;
  evaluationDate: string;
  weight: number;
}
export interface CreateOrUpdateEvaluationDto {
  blockId: string;
  title: string;
  evaluationDate: string;
  weight: number;
}
