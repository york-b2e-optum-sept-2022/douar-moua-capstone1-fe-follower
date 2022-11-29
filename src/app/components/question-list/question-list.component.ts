import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IQuestion} from "../../_interfaces/IQuestion";
import {Subscription} from "rxjs";
import {QuestionService} from "../../services/question.service";
import {ISurvey} from "../../_interfaces/ISurvey";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit, OnDestroy {

  questionList: IQuestion[] = []
  questionListSub: Subscription

  @Input() survey!: ISurvey

  constructor(private questionService: QuestionService) {
    this.questionListSub = this.questionService.$questionList.subscribe(
      questionList => this.questionList = questionList)
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.questionListSub.unsubscribe();
  }

}
