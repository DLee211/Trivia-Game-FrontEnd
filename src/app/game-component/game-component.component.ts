import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../services/api.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-game-component',
  templateUrl: './game-component.component.html',
  styleUrl: './game-component.component.css'
})

export class GameComponentComponent implements OnInit{
  game:any;
  title = "Quiz-Game-Front-End";
  displayedColumns: string[] = ['GameType', 'Score', 'button'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private api : ApiService, private route: ActivatedRoute)
  {
  }
  ngOnInit(){
    this.route.params.subscribe(params => {
      const id = +params['id']; // the '+' operator converts the string to a number
      this.api.getGameById(id).subscribe(game => {
        this.game = game;
        console.log('Updated score:', this.game.score);
      });
    });
    this.GetAllGames();
  }

  GetAllGames()
  {
    this.api.getGame().subscribe({
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

  editGames(id: number, data: any){
    this.api.updateGame(data, id).subscribe({
      next: (res)=>{
        alert("Data edited successfully");
        this.GetAllGames();
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  deleteGames(id: number){
    this.api.deleteGame(id).subscribe({
      next: (res)=>{
        alert("Data deleted successfully");
        this.GetAllGames();
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

}
