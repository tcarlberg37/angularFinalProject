import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginMessage: string;
  loginForm: FormGroup;

  constructor(public authService: AuthService, public router: Router, public fb: FormBuilder) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: '',
      password: ''
    })
  }


  login() {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(() => {
      if (this.authService.isLoggedIn) {
        console.log(this.loginForm.value.username + " logged in.");
        let redirectUrl = '/player-rankings';
        this.router.navigateByUrl(redirectUrl);
      } else {
        this.loginMessage = 'Incorrect username or password.';
      }
    });
  }

  logout() {
    this.authService.logout();
    this.loginMessage = "Logged out successfully.";
  }
}