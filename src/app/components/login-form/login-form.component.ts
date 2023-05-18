import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  constructor(private http: HttpClient){}

  username: string = "";
  password: string = "";
  show: boolean = false;
  submit() {
    const body = {
      username: this.username,
      password: this.password
    }
    console.log(JSON.stringify(body))

    this.http.post<any>(environment.apiUrl+'/users/login', body).subscribe(
      data => {
        console.log(data);
      },
      error => {alert("Username or Password are incorrect")});
    this.clear();
  }
  clear() {
    this.username = "";
    this.password = "";
    this.show = true;
  }
}
