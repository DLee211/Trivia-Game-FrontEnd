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
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  value: any;

  constructor(private api : ApiService,private route: ActivatedRoute, private changeDetectorRefs: ChangeDetectorRef)
  {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('Params:', params); // Log the params
      const quizId = +params['id']; // '+' is used to convert the parameter to a number
      console.log('Game ID:', quizId); // Log the gameId
      this.GetQuestionById(quizId);
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

  GetQuestionById(id: number) {
    this.api.getQuestionById(id).subscribe({
      next: (res)=>{
        // Ensure the response is an array
        const questions = Array.isArray(res) ? res : [res];
        // Generate a random index
        const randomIndex = Math.floor(Math.random() * questions.length);
        // Select the question at the random index
        const randomQuestion = questions[randomIndex];
        // Create a new MatTableDataSource with the random question
        this.dataSource = new MatTableDataSource([randomQuestion]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err)=>{
        console.log(err);
      }
    })
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
