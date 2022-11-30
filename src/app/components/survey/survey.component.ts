import {Component, OnDestroy, OnInit} from '@angular/core';
import {ISurvey} from "../../_interfaces/ISurvey";
import {SurveyService} from "../../services/survey.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit, OnDestroy {

  survey!: ISurvey;
  surveySub: Subscription;

  constructor(private surveyService: SurveyService) {
    this.surveySub = surveyService.$survey.subscribe(survey => this.survey = <ISurvey>survey)
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.surveySub.unsubscribe()
  }

}
