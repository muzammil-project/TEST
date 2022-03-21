import { Component, OnInit } from '@angular/core';
import QuestionsArray from '../../jsonFile/questions.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-assessment';
  questionsArray: Questions[] = []
  index: number = 0
  questionProgress: number = 0;
  questionProgress2: number = 0;
  iscorrect: boolean = false;
  disabled: boolean = false;
  isSelect: boolean = false;
  correctWidth: number = 0
  wrongWidth: number = 0
  maxWidth: number = 100
  difficultyNumber: number = 0
  difficulty: string = '';
  constructor() {
  }

  ngOnInit(): void {
    this.questionsArray = QuestionsArray
    this.questionProgress = (this.questionsArray.length / 2) / 2
    this.questionProgress2 = this.questionProgress
    this.difficultyNumber = this.questionsArray[0].difficulty == 'easy' ? 1 : this.questionsArray[0].difficulty == 'medium' ? 2 : 3
  }

  Next() {
    if (this.difficulty == '') {
      alert("please select answer")
    }
    else {
      this.difficultyNumber = this.difficulty == 'easy' ? 1 : this.difficulty == 'medium' ? 2 : 3
      this.disabled = false
      this.isSelect = false
      if (this.index == this.questionsArray.length) {
        return
      }
      else {
        this.questionProgress += this.questionProgress2
        this.index++
      }
      this.difficulty = ''
    }
  }

  checkAnswer(correntanswer: string, selectedanswer: string, difficulty: string) {
    this.difficulty = difficulty
    this.isSelect = true
    this.disabled = true
    if (correntanswer == selectedanswer) {
      this.correctWidth += (1 / this.questionsArray.length) * 100
      this.iscorrect = true

    }
    else {
      this.wrongWidth += (1 / this.questionsArray.length) * 100
      this.iscorrect = false
    }
  }
}

export interface Questions {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}
