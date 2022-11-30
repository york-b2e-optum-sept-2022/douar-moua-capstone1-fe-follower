import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IQuestion} from "../../_interfaces/IQuestion";
import {Subscription} from "rxjs";
import {QuestionService} from "../../services/question.service";
import {ISurvey} from "../../_interfaces/ISurvey";
import {IResponse} from "../../_interfaces/IResponse";
import {CompletedSurveyService} from "../../services/completed-survey.service";

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
  completedSurvey: boolean = false

  choice1: string = "Choice 1"
  choice2: string = "Choice 2"
  choice3: string = "Choice 3"
  choice4: string = "Choice 4"

  choiceTrue: string = "true"
  choiceFalse: string = "false"

  instance: number = 0
  // responseList: IResponse[] = []


  constructor(private questionService: QuestionService, private completedSurveyService: CompletedSurveyService) {
    this.questionListSub = this.questionService.$questionList.subscribe(
      questionList => this.questionList = questionList);
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
    this.instance = new Date().getTime()
    this.completedSurveyService.beginSurveyToggle(this.beginSurvey)
  }

  nextQuestionClick(){
    let response: IResponse = {
      answer: <string>this.question.answer,
      question: this.question.prompt,
      questionId: <number>this.question.id,
      surveyId: this.survey.id,
      surveyTitle: this.survey.title,
      instance: this.instance
    }

    // -- require answer --
    if (response.answer === null || ""){
      alert("Please answer question before going to the next question!")
      return
    }

    // // -- store response in responseList --
    // this.responseList.push(response)

    // -- submit response to database --
    this.completedSurveyService.submitResponse(response)

    // -- show next question & set up next question for show --
    this.question = this.questionList[this.questionIndex];
    this.questionIndex++;

    // -- IF all questions are answered, notify completion --
    if (this.questionIndex > this.questionList.length){
      // this.completedSurveyService.submitResponses(this.responseList)
      this.completedSurvey = true
      this.beginSurvey = false
      this.completedSurveyService.beginSurveyToggle(this.beginSurvey)
    }

  }

  cancelSurveyClick() {
    this.completedSurveyService.deleteResponses(this.instance)
    this.beginSurvey=false
    this.questionIndex = 0
  }
}
