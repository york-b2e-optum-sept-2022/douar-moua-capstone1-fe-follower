import {Component, OnDestroy} from '@angular/core';
import {CompletedSurveyService} from "./services/completed-survey.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  title = 'douar-moua-capstone1-fe-follower';

  viewSurvey:boolean = false

  beginSurvey: boolean = false
  beginSurveySub: Subscription

  constructor(private completedSurveyService: CompletedSurveyService) {
    this.beginSurveySub = this.completedSurveyService.$beginSurvey.subscribe(
      begin => this.beginSurvey = begin)
  }

  toggleViewSurveyClick(viewSurvey: boolean) {
    this.viewSurvey = viewSurvey
  }

  ngOnDestroy(): void {
    this.beginSurveySub.unsubscribe();
  }
}
