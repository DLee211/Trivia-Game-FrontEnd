import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-question-component',
  templateUrl: './question-component.component.html',
  styleUrl: './question-component.component.css'
})
export class QuestionComponentComponent {

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api : ApiService)
  {
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

  GetQuestionById(id: number)
  {
    this.api.getQuestionById(id).subscribe({
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
