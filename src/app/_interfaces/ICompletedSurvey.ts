import {IQuestion} from "./IQuestion";

export interface ICompletedSurvey{
  id?: number,
  surveyId: number,
  surveyTitle: string,
  questions?: IQuestion[],
  // answers?: IQuestion[]
}
