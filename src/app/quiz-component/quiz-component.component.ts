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
  displayedColumns: string[] = ['difficulty', 'button'];
  dataSource!: MatTableDataSource<any>;
  gameId!: number; // Add this line
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api : ApiService,private route: ActivatedRoute, private changeDetectorRefs: ChangeDetectorRef)
  {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('Params:', params);
      const gameId = +params['id'];
      console.log('Game ID:', gameId);
      this.GetQuizzesByGameId(gameId);
    });
  }


  GetAllQuizzes(){
    this.api.getQuiz().subscribe({
      next: (res)=>{
        console.log('Response:', res);
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
    console.log('Fetching quizzes for game ID:', gameId);
    this.api.getQuizzesByGameId(gameId).subscribe({
      next: (res)=>{
        console.log('Response:', res);
        const data = Array.isArray(res) ? res : [res];
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.changeDetectorRefs.detectChanges();
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
