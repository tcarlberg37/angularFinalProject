import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { MatChipInputEvent, MatTableDataSource } from '@angular/material';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})

export class AddGameComponent implements OnInit {
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
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private gameApi: ApiService
  ) {
    
   }

  /* Reactive book form */
  submitBookForm() {
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

  /* Submit book */
  submitGameForm() {
    if (this.gameForm.valid) {
      this.gameApi.AddGame(this.gameForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/game-list'))
      });
    }
  }

}