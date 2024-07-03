import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ApiService} from "../services/api.service";
import {ActivatedRoute} from "@angular/router";
import { Router } from '@angular/router';


import { MatFormFieldModule } from '@angular/material/form-field';
import {Observable} from "rxjs";

@Component({
  selector: 'app-question-component',
  templateUrl: './question-component.component.html',
  styleUrl: './question-component.component.css'
})
export class QuestionComponentComponent {
  displayedColumns: string[] = ['problem'];
  displayedColumns2: string[] = ['answer'];
  wrongAnswerCount = 0;
  allQuestions: any[] = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  value: any;
  isAnswerCorrect = false;
  isAnswerSubmitted = false;

  constructor(private api : ApiService,private route: ActivatedRoute, private changeDetectorRefs: ChangeDetectorRef,private router: Router)
  {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id']; // the '+' operator converts the string to a number
      this.GetQuestionById(id);
    });
  }

  gameScore: number = 0;

  updateGameScore(gameId: number, newScore: number): Observable<any> {
    return new Observable(observer => {
      this.api.getGameById(gameId).subscribe({
        next: (game) => {
          const gameType = game.gameType;
          console.log('Game Type:', gameType);
          const gameData = { score: newScore, gameType: gameType }; // Include the gameType in the gameData
          this.api.updateGame(gameData, gameId).subscribe({
            next: (res) => {
              console.log('Game score updated:', res);
              observer.next(res);
              observer.complete();
            },
            error: (err) => {
              console.log(err);
              observer.error(err);
            }
          });
        },
        error: (err) => {
          console.log(err);
          observer.error(err);
        }
      });
    });
  }

  GetAllQuestions()
  {
    this.api.getQuestion().subscribe({
      next: (res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  selectRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * this.allQuestions.length);
    this.dataSource = new MatTableDataSource([this.allQuestions[randomIndex]]);
  }

  checkAnswer(userAnswer: string, correctAnswer: string, questionId: number): void {
    if (correctAnswer.length <= 3) {
      this.isAnswerCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
      this.isAnswerSubmitted = true;
    }
    else
    {
      const distance = levenshtein(userAnswer.toLowerCase(), correctAnswer.toLowerCase());
      const threshold = 2;
      this.isAnswerCorrect = distance <= threshold;
      this.isAnswerSubmitted = true;
    }

    if (this.isAnswerCorrect) {
      this.gameScore++;
      console.log('Current score:', this.gameScore);
    } else {
      this.wrongAnswerCount++;
      console.log('Current score:', this.gameScore);
    }

    if (this.wrongAnswerCount >= 3) {
      console.log('questionid:', questionId)
      this.api.getGameIdByQuestionId(questionId).subscribe({
        next: (gameIdResponse) => {
          this.api.getGameById(gameIdResponse).subscribe({
            next: (game) => {
              console.log('Game:', game)
              const currentHighScore = game.score;
              console.log('Current high score:', currentHighScore);
              console.log('Game score:', this.gameScore);
              if (this.gameScore > currentHighScore) {
                this.updateGameScore(gameIdResponse, this.gameScore).subscribe({
                  next: (res) => {
                    window.alert('Finished!');
                    this.router.navigate(['/game']);
                  },
                  error: (err) => {
                    console.log(err);
                  }
                });
              } else {
                window.alert('Finished!');
                this.router.navigate(['/game']);
              }
            },
            error: (err) => {
              console.log(err);
            }
          });
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
  GetQuestionById(id: number) {
    this.api.getQuestionById(id).subscribe({
      next: (res)=>{
        console.log('Response:', res);
        this.allQuestions = Array.isArray(res) ? res : [res];
        this.selectRandomQuestion();
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }

  editQuestions(id: number, data: any){
    this.api.updateQuestion(data, id).subscribe({
      next: (res)=>{
        alert("Data edited successfully");
        this.GetAllQuestions();
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  deleteQuestions(id: number){
    this.api.deleteQuestion(id).subscribe({
      next: (res)=>{
        alert("Data deleted successfully");
        this.GetAllQuestions();
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
}

function levenshtein(a: string, b: string): number {
  const an = a.length;
  const bn = b.length;
  const matrix = Array.from({ length: an + 1 }, () => Array(bn + 1).fill(0));
  for (let i = 0; i <= an; i++) matrix[i][0] = i;
  for (let j = 0; j <= bn; j++) matrix[0][j] = j;

  for (let i = 1; i <= an; i++) {
    for (let j = 1; j <= bn; j++) {
      const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + substitutionCost
      );
    }
  }
  return matrix[an][bn];
}
