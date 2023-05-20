import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  constructor(
    private http: HttpClient,
    private router: Router){}

  username: string = "";
  password: string = "";
  
  show: boolean = false;
  submit() {
    const body = {
      username: this.username,
      password: this.password
    }

    this.http.post<any>(environment.apiUrl+'/users/login', body, { withCredentials: true }).subscribe(
      data => {
        this.goToCrud();
      },
      error => {alert("Username or Password are incorrect")});
    this.clear();
  }
  clear() {
    this.username = "";
    this.password = "";
    this.show = true;
  }

  goToCrud() {
    this.router.navigate(['crud']);
  }
}
