import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ISurvey} from "../_interfaces/ISurvey";
import {IQuestion} from "../_interfaces/IQuestion";
import {ICompletedSurvey} from "../_interfaces/ICompletedSurvey";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  // --- SURVEY STUFF ---

  public getSurveyList(){
    return this.httpClient.get('http://localhost:8080/api/survey/all-survey'
    ) as Observable<ISurvey[]>
  }

  public getSurveyById(surveyId: number){
    return this.httpClient.get(`http://localhost:8080/api/survey?surveyId=${surveyId}`
    ) as Observable<ISurvey>
  }

  // --- QUESTION STUFF ---

  public getSurveyQuestionList(surveyId: number){
    return this.httpClient.get(`http://localhost:8080/api/question?surveyId=${surveyId}`
    ) as Observable<IQuestion[]>
  }

  // --- COMPLETED SURVEYS ---

  public submitCompletedSurvey(completedSurvey: ICompletedSurvey){
    console.log(completedSurvey)
    return this.httpClient.post('http://localhost:8080/api/completed-survey',
      {
        surveyId: completedSurvey.surveyId,
        surveyTitle: completedSurvey.surveyTitle,
        questions: completedSurvey.questions,
      }) as Observable<ICompletedSurvey>
  }
}
