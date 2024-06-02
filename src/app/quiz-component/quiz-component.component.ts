import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ApiService} from "../services/api.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-component',
  templateUrl: './quiz-component.component.html',
  styleUrl: './quiz-component.component.css'
})


export class QuizComponentComponent {
  displayedColumns: string[] = ['QuizId', 'Level', 'button'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api : ApiService,private route: ActivatedRoute, private changeDetectorRefs: ChangeDetectorRef)
  {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const gameId = +params['id']; // '+' is used to convert the parameter to a number
      this.GetQuizzesByGameId(gameId);
    });
  }


  GetAllQuizzes(){
    this.api.getQuiz().subscribe({
      next: (res)=>{
        console.log('Response:', res); // Log the response
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  GetQuizzesByGameId(gameId: number) {
    console.log(gameId)
    this.api.getQuizzesByGameId(gameId).subscribe({
      next: (res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.changeDetectorRefs.detectChanges(); // Manually trigger change detection
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
