import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IQuestion} from "../../_interfaces/IQuestion";
import {Subscription} from "rxjs";
import {QuestionService} from "../../services/question.service";
import {CompletedSurveyService} from "../../services/completed-survey.service";
import {ISurvey} from "../../_interfaces/ISurvey";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy {

  questionList: IQuestion[] = []
  questionListSub: Subscription

  @Input() survey!: ISurvey

  submitSurveyToggleSub: Subscription

  constructor(private questionService: QuestionService, private completedSurveyService: CompletedSurveyService) {
    this.questionListSub = this.questionService.$questionList.subscribe(
      questionList => this.questionList = questionList);

    this.submitSurveyToggleSub = this.completedSurveyService.$submitSurvey.subscribe(
      submitSurveyTrue => this.submitQuestionsAnswers());

  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.questionListSub.unsubscribe();
    this.submitSurveyToggleSub.unsubscribe()
  }

  submitQuestionsAnswers(){
    if (this.questionList.filter
    (question => question.answer == "")
    ){
      alert("Please answer question!")
      return;
    }

    this.completedSurveyService.submitSurvey(this.survey, this.questionList)
  }

}
