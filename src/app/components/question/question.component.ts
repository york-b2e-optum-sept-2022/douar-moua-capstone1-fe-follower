import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IQuestion} from "../../_interfaces/IQuestion";
import {Subscription} from "rxjs";
import {QuestionService} from "../../services/question.service";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy {

  questionList: IQuestion[] = []
  questionListSub: Subscription

  // @Input() question!: IQuestion;
  // @Input() questionList: IQuestion[] = []

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
