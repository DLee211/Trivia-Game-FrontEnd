import {Component, ViewChild} from '@angular/core';
import {ApiService} from "../services/api.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-game-component',
  templateUrl: './game-component.component.html',
  styleUrl: './game-component.component.css'
})
export class GameComponentComponent {

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api : ApiService)
  {
  }
  GetAllGames()
  {
    this.api.getGame().subscribe({
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
