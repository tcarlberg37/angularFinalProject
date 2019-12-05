import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})

export class EditPlayerComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', {static: false}) chipList;
  @ViewChild('resetPlayerForm', {static: false}) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  playerForm: FormGroup;
  StatusArray: any = ['Available', 'Unavailable'];
  rankArray: any = [1,2,3,4,5,6,7,8,9,10];

  ngOnInit() {
    this.updateBookForm();
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
      console.log(data.subjects)
      this.StatusArray = data.status;
      this.rankArray = data.rank;
      this.playerForm = this.fb.group({
        player_name: [data.player_name, [Validators.required]],
        rank: [data.rank, [Validators.required]],
        score: [data.score, [Validators.required]],
        time: [data.time],
        favourite_game: [data.favourite_game, [Validators.required]],
        status: [data.status]
      })      
    })    
  }

  /* Reactive book form */
  updateBookForm() {
    this.playerForm = this.fb.group({
      player_name: ['', [Validators.required]],
      rank: [this.rankArray],
      score: [0],
      time: ['0d 0h 0m'],
      favourite_game: ['', [Validators.required]],
      status: [this.StatusArray]
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.playerForm.controls[controlName].hasError(errorName);
  }

  /* Update book */
  updatePlayerForm() {
    console.log(this.playerForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.playerApi.UpdatePlayer(id, this.playerForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/player-list'))
      });
    }
  }
  
}