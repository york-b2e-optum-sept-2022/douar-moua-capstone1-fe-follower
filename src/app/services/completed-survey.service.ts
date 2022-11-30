import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {IResponse} from "../_interfaces/IResponse";
import {BehaviorSubject, first, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CompletedSurveyService {

  // $responses = new BehaviorSubject<IResponse[]>([])
  $response = new BehaviorSubject<IResponse | null>(null)

  beginSurvey: boolean = false
  $beginSurvey = new Subject<boolean>()

  constructor(private httpService: HttpService) { }

  public beginSurveyToggle(toggleBeginSurvey: boolean){
    this.$beginSurvey.next(toggleBeginSurvey)
  }

  public submitResponse(response: IResponse){
    this.httpService.submitResponse(response).pipe(first()).subscribe({
      next: response => {
        this.$response.next(response)
      },
      error: err => {
        console.error(err)
        alert("Unable to submit response, please try again later.")
      }
    })
  }

  public deleteResponses(instance: number){
    this.httpService.deleteResponses(instance).pipe(first()).subscribe({
      next: () => {
        this.$beginSurvey.next(this.beginSurvey)
      },
      error: err => {
        console.error(err)
        alert("Unable to cancel/delete your responses, please try again later.")
      }
    })
  }

  // public submitResponses(responses: IResponse[]){
  //   this.httpService.submitResponses(responses).pipe(first()).subscribe({
  //     next: responses => {
  //       this.$responses.next(responses)
  //     },
  //     error: err => {
  //       console.error(err)
  //       alert("Unable to submit survey, please try again later.")
  //     }
  //   })
  // }

}
