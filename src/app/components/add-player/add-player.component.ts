import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatTableDataSource } from '@angular/material';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Game } from 'src/app/shared/game';

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})

export class AddPlayerComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', {static: false}) chipList;
  @ViewChild('resetPlayerForm', {static: false}) myNgForm;
  playerForm: FormGroup;
  statusArray: any = ['Available', 'Unavailable'];
  rankArray: any = [1,2,3,4,5,6,7,8,9,10];
  GameData: any = [];
  dataSource: MatTableDataSource<Game>;
  gameArray: any = ['Halo 3', 'Halo 4', 'Minecraft', 'Spiderman', 'Call of Duty', 'Warcraft 3', 'World of Warcraft', 'Age of Empires 2', 'Age of Empires 3'];


  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private playerApi: ApiService,
  ) { 
    /*
    this.gameApi.GetGames().subscribe(data => {
      this.GameData = data;
      this.gameArray = this.gameApi.GetGames().forEach(element => {
        element[0];
      });
      this.dataSource = new MatTableDataSource<Game>(this.GameData);
    }) 
    */
  }

  /* Reactive book form */
  submitBookForm() {
    this.playerForm = this.fb.group({
      player_name: ['', [Validators.required]],
      rank: 0,
      score: [0],
      time: ['0d 0h 0m'],
      favourite_game: ['', [Validators.required]],
      status: ''
    })
  }


  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.playerForm.controls[controlName].hasError(errorName);
  }  

  /* Submit book */
  submitPlayerForm() {
    if (this.playerForm.valid) {
      this.playerApi.AddPlayer(this.playerForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/player-list'))
      });
    }
  }

}