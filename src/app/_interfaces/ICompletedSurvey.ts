import {IQuestion} from "./IQuestion";

export interface ICompletedSurvey{
  id: number,
  surveyId: number,
  questions: IQuestion[],
}
