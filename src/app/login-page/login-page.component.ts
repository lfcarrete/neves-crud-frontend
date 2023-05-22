import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  title: string = 'Neves CRUD Basico';
  constructor(
    private http: HttpClient,
    private router: Router){}

  ngOnInit() {

    this.http.get<any>(environment.apiUrl + '/users', { withCredentials: true }).subscribe(data => {
      this.router.navigate(['crud']);
    },)

  }
}
