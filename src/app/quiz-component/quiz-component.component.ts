import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-quiz-component',
  templateUrl: './quiz-component.component.html',
  styleUrl: './quiz-component.component.css'
})
export class QuizComponentComponent {
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api : ApiService)
  {
  }

  GetAllQuizzes(){
    this.api.getQuiz().subscribe({
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

  editQuizzes(id: number, data: any){
    this.api.updateQuiz(data, id).subscribe({
      next: (res)=>{
        alert("Data edited successfully");
        this.GetAllQuizzes();
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  deleteQuizzes(id: number){
    this.api.deleteQuiz(id).subscribe({
      next: (res)=>{
        alert("Data deleted successfully");
        this.GetAllQuizzes();
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
}
