import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../services/api.service";
import {ActivatedRoute} from "@angular/router";
import { Question } from '../question.interface';
import {DialogComponentComponent} from "../dialog-component/dialog-component.component";
@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css'] // Corrected property name and ensured it's an array

})
export class EditQuestionComponent implements OnInit {
  displayedColumns: string[] = ['Difficulty', 'Question', 'Answer', 'Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog: MatDialog, private api: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      console.log('Game ID:', id)
      this.GetAllTriviaData(id);
    });
  }

  GetAllTriviaData(id: number) {
    this.api.getQuizzesByGameId(id).subscribe({
      next: (res) => {
        const flattenedData = this.flattenData(res);
        console.log('Flattened Data:', flattenedData)
        this.dataSource = new MatTableDataSource(flattenedData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  flattenData(data: any) {
    const flattened = data.reduce((acc: any, item: any) => {
      const questions = item.questions.map((q: Question) => ({
        difficulty: item.difficulty,
        gameId: item.gameId,
        questionId: q.questionId,
        problem: q.problem,
        answer: q.answer
      }));
      return [...acc, ...questions];
    }, []);
    return flattened;
  }

  editData(row: any, id: number) {
    this.dialog.open(DialogComponentComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val=> {
      this.GetAllTriviaData(id);
    })
  }

  deleteData(id: number) {

  }

  openDialog() {
    this.dialog.open(DialogComponentComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=> {
      this.GetAllTriviaData(1);
    })
  }
}

