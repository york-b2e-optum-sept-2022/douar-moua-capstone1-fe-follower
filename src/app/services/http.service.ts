import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ISurvey} from "../_interfaces/ISurvey";
import {IQuestion} from "../_interfaces/IQuestion";
import {IResponse} from "../_interfaces/IResponse";

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

  // --- COMPLETED SURVEYS STUFF ---

  public submitResponse(response: IResponse){
    return this.httpClient.post('http://localhost:8080/api/response',
      {
        answer: response.answer,
        question: response.question,
        questionId: response.questionId,
        surveyId: response.surveyId,
        surveyTitle: response.surveyTitle,
        instance: response.instance}
    ) as Observable<IResponse>
  }

  public deleteResponses(instance: number){
    return this.httpClient.delete(`http://localhost:8080/api/response?instance=${instance}`)
  }

  // public submitResponses(responses: IResponse[]){
  //   return this.httpClient.post('http://localhost:8080/api/response/add-responses',
  //     {responses: responses}
  //     ) as Observable<IResponse[]>
  // }
}
