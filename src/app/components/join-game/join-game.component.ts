import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', {static: false}) chipList;
  @ViewChild('resetPlayerForm', {static: false}) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  playerForm: FormGroup;

  ngOnInit() {
    
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private playerApi: ApiService
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.playerApi.GetPlayer(id).subscribe(data => {
      console.log(data);
      this.playerForm = this.fb.group({
        player_name: data.player_name,
        rank: data.rank,
        score: data.score,
        time: data.time,
        favourite_game: data.favourite_game,
        status: data.status
      })      
    })    
  }

  joinGame() {
    var id = this.actRoute.snapshot.paramMap.get('id');
    // joining a game marks the player as unavailable
    this.playerForm.value.status = "Unavailable";
    console.log(this.playerForm.value)
    this.playerApi.UpdatePlayer(id, this.playerForm.value).subscribe( res => {
      this.ngZone.run(() => this.router.navigateByUrl('/player-rankings'))
    });
  }

}
