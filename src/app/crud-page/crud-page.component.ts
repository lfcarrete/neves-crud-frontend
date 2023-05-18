import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Location } from '@angular/common';

@Component({
  selector: 'app-crud-page',
  templateUrl: './crud-page.component.html',
  styleUrls: ['./crud-page.component.css']
})
export class CrudPageComponent {

  jwt: any = null;
  dataSource: any = [];
  constructor(
    private http: HttpClient,
    private location: Location) {
    this.jwt = this.location.getState();
  }
  public displayedColumns = ['id', 'name', 'username', 'created_at', 'update', 'delete']

  name: string = ""
  username: string = "";
  password: string = "";

  ngOnInit() {
    var headers = { 'Authorization': `Bearer ${this.jwt["jwt"]}` }

    this.http.get<any>(environment.apiUrl + '/users', { headers }).subscribe(data => {
      this.dataSource = data;
    },
      error => {
        alert("Trouble communicating with the server");
      })
  }
  deleteOnClick(id: number) {
    var headers = { 'Authorization': `Bearer ${this.jwt["jwt"]}` }

    this.http.delete<any>(environment.apiUrl + '/users/id/' + id, { headers }).subscribe(e => {})
    window.location.reload();
  }

  submit(){
    const body = {
      name: this.name,
      username: this.username,
      password: this.password
    }
    var headers = { 'Authorization': `Bearer ${this.jwt["jwt"]}` }
    this.http.post<any>(environment.apiUrl+'/users/create', body, { headers: headers}).subscribe(
      data => {window.location.reload();},
      error => {alert("Something went wrong")});
      
  }
}
