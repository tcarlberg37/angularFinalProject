import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  opened = true;
  isLoggedIn = false;
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;

  constructor(public authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  ngOnInit() { }


  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }
}