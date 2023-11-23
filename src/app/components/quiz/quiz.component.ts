import { Component } from '@angular/core';

import quiz__db from '../../../assets/data/quiz__db.json';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
  title = '';

  questions: any;
  questionSelected: any;

  answer: string[] = [];
  answerSelected: string = '';

  questionIndex = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  results = '';

  ngOnInit(): void {
    if (quiz__db) {
      this.finished = false;
      this.questionIndex = 0;

      this.title = quiz__db.title;

      this.questions = quiz__db.questions;
      this.questionSelected = this.questions[this.questionIndex];
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(value: string) {
    this.answer.push(value);
    this.nextStep();
  }

  nextStep() {
    this.questionIndex += 1;
    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      this.finished = true;
      this.result();
    }
  }

  result() {
    let answerOne = this.answer.filter((answer) => answer === 'A').length;
    let answerTwo = this.answer.filter((answer) => answer === 'B').length;
    if (answerOne > answerTwo) {
      this.results = quiz__db.results.A;
    } else {
      this.results = quiz__db.results.B;
    }

    console.log('A', answerOne, '- B', answerTwo);
  }

  reset() {
    this.questionIndex = 0;
    this.finished = false;
    this.questionSelected = this.questions[this.questionIndex];
  }
}
