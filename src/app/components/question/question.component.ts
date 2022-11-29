import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IQuestion} from "../../_interfaces/IQuestion";
import {Subscription} from "rxjs";
import {QuestionService} from "../../services/question.service";
import {CompletedSurveyService} from "../../services/completed-survey.service";
import {ISurvey} from "../../_interfaces/ISurvey";
import {IResponse} from "../../_interfaces/IResponse";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy {

  questionList: IQuestion[] = []
  questionListSub: Subscription

  question!: IQuestion;
  questionIndex: number = 0;

  @Input() survey!: ISurvey

  beginSurvey: boolean = false

  choice1: string = "Choice 1"
  choice2: string = "Choice 2"
  choice3: string = "Choice 3"
  choice4: string = "Choice 4"

  choiceTrue: string = "true"
  choiceFalse: string = "false"

  constructor(private questionService: QuestionService, private completedSurveyService: CompletedSurveyService) {
    this.questionListSub = this.questionService.$questionList.subscribe(
      questionList => this.questionList = questionList);

    // this.submitSurveyToggleSub = this.completedSurveyService.$submitSurvey.subscribe(
    //   submitSurveyTrue => this.submitQuestionsAnswers());

  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.questionListSub.unsubscribe();
  }

  beginSurveyClick(){
    this.question = this.questionList[this.questionIndex];
    this.questionIndex++;
    this.beginSurvey=true
  }

  nextQuestionClick(){
    this.question = this.questionList[this.questionIndex];
    this.questionIndex++;
  }

}
