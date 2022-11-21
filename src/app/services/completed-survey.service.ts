import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Subject} from "rxjs";
import {ISurvey} from "../_interfaces/ISurvey";
import {IQuestion} from "../_interfaces/IQuestion";

@Injectable({
  providedIn: 'root'
})
export class CompletedSurveyService {

  submitSurveyToggle: boolean = true
  $submitSurvey = new Subject<boolean>()

  constructor(private httpService: HttpService) { }

  surveySubmitClicked(){
    this.$submitSurvey.next(this.submitSurveyToggle)
  }

  submitSurvey(survey: ISurvey, questions: IQuestion[]){
    console.log(survey)
    console.log(questions)
  }

}
