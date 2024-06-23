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
  displayedColumns: string[] = ['questionId', 'problem', 'answer'];
  allQuestions: any[] = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  questionCount = 0;
  value: any;

  constructor(private api : ApiService,private route: ActivatedRoute, private changeDetectorRefs: ChangeDetectorRef,private router: Router)
  {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id']; // the '+' operator converts the string to a number
      this.GetQuestionById(id);
    });
  }

  // Add a new property to hold the score
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
    if (userAnswer === correctAnswer) {
      window.alert('Correct answer!');
      this.gameScore++;
      console.log('Current score:', this.gameScore);
      this.selectRandomQuestion();
    } else {
      window.alert('Incorrect answer.');
      console.log('Current score:', this.gameScore);
      this.selectRandomQuestion();
    }

    this.questionCount++;

    console.log('Current question count:', this.questionCount);

    if (this.questionCount >= 5) {
      this.api.getGameIdByQuestionId(questionId).subscribe({
        next: (gameId) => {
          this.updateGameScore(gameId, this.gameScore).subscribe({
            next: (res) => {
              window.alert('Finished!');
              this.router.navigate(['/game']);
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
