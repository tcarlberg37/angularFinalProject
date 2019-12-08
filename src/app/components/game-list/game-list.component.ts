import { Game } from './../../shared/game';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})

export class GameListComponent implements OnInit {
  GameData: any = [];
  dataSource: MatTableDataSource<Game>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  displayedColumns: string[] = ['title', 'platform', 'genre', 'rating', 'publisher', 'release', 'status', 'update', 'delete'];

  constructor(private gameApi: ApiService) {
    this.gameApi.GetGames().subscribe(data => {
      this.GameData = data;
      this.dataSource = new MatTableDataSource<Game>(this.GameData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() { }

  deleteGame(index: number, e){
    if(window.confirm('Are you sure you want to delete this game?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.gameApi.DeleteGame(e._id).subscribe()
    }
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

}