import { Player } from './../../shared/player';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})

export class PlayerListComponent implements OnInit {
  PlayerData: any = [];
  dataSource: MatTableDataSource<Player>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  displayedColumns: string[] = ['player_name', 'rank', 'score', 'time', 'favourite_game', 'status', 'update', 'delete'];

  constructor(private playerApi: ApiService) {
    this.playerApi.GetPlayers().subscribe(data => {
      this.PlayerData = data;
      this.dataSource = new MatTableDataSource<Player>(this.PlayerData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() { }

  deletePlayer(index: number, e){
    if(window.confirm('Are you sure you want to delete this player?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.playerApi.DeletePlayer(e._id).subscribe()
    }
  }

}