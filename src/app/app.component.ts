import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'douar-moua-capstone1-fe-follower';

  viewSurvey:boolean = false

  toggleViewSurveyClick(viewSurvey: boolean) {
    this.viewSurvey = viewSurvey
  }
}
