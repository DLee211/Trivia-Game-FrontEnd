import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ApiService} from "../services/api.service";
import {ActivatedRoute} from "@angular/router";
import { MatFormFieldModule } from '@angular/material/form-field';


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
  value: any;

  constructor(private api : ApiService,private route: ActivatedRoute, private changeDetectorRefs: ChangeDetectorRef)
  {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id']; // the '+' operator converts the string to a number
      this.GetQuestionById(id);
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

  checkAnswer(userAnswer: string, correctAnswer: string): void {
    if (userAnswer === correctAnswer) {
      window.alert('Correct answer!');
      this.selectRandomQuestion();
    } else {
      window.alert('Incorrect answer. Please try again.');
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
