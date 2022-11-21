import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {BehaviorSubject, first} from "rxjs";
import {IQuestion} from "../_interfaces/IQuestion";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  public $questionList = new BehaviorSubject<IQuestion[]>([])

  constructor(private httpService: HttpService) { }

  public getSurveyQuestionList(surveyId: number){
    this.httpService.getSurveyQuestionList(surveyId).pipe(first()).subscribe({
      next: questionList => {
        this.$questionList.next(questionList)
      },
      error: err => {
        console.error(err)
        alert("Unable to get survey's list of questions, please try again later.")
      }
    })
  }
}
