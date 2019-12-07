import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})

export class EditGameComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', {static: false}) chipList;
  @ViewChild('resetGameForm', {static: false}) myNgForm;
  gameForm: FormGroup;
  statusArray: any = ['Active', 'Inactive'];
  ratingArray: any = ['0 Stars', '1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'];
  platformArray: any = ['Xbox 360', 'Xbox One', 'Playstation 3', 'Playstation 4', 'Gamecube', 'Nintendo Wii', 'Nintendo Switch', 'PC', 'All'];


  ngOnInit() {
    this.updateBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private gameApi: ApiService
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.gameApi.GetGame(id).subscribe(data => {
      console.log(data)
      this.gameForm = this.fb.group({
        title: data.title,
        platform: data.platform,
        genre: data.genre,
        rating: data.rating,
        publisher: data.publisher,
        release: data.release,
        status: data.status
      })      
    }) 
  }

  /* Reactive book form */
  updateBookForm() {
    this.gameForm = this.fb.group({
      title: ['', [Validators.required]],
      platform: '',
      genre: '',
      rating: '0 stars',
      publisher: '',
      release: '',
      status: ''
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.gameForm.controls[controlName].hasError(errorName);
  }

  /* Update book */
  updateGameForm() {
    console.log(this.gameForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.gameApi.UpdateGame(id, this.gameForm.value).subscribe( res => {
      this.ngZone.run(() => this.router.navigateByUrl('/game-list'))
    });
  }
  
}