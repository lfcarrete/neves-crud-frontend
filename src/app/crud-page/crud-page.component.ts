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

  editing: boolean = false;
  editingId: number = 0;
  editingname: string = ""
  editingusername: string = "";
  ngOnInit() {
    var headers = { 'Authorization': `Bearer ${this.jwt["jwt"]}` }

    this.http.get<any>(environment.apiUrl + '/users', { headers }).subscribe(data => {
      this.dataSource = data;
      this.dataSource = this.dataSource.sort((a: any, b: any) => a.id - b.id )
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
  editUser(id: number, name: string, username:string) {
    this.editing = !this.editing;
    this.editingId = id;
    this.editingname = name;
    this.editingusername = username;
  }
  editAddUser(id: number, name: string, username:string){
    const body = {
      id: id,
      name: this.editingname,
      username: this.editingusername,
    }

    var headers = { 'Authorization': `Bearer ${this.jwt["jwt"]}` }
    this.http.patch<any>(environment.apiUrl+'/users/update', body, { headers: headers}).subscribe(
      data => {window.location.reload();},
      error => {alert("Something went wrong")});
    
    this.editing = false;
  }

  submit(){
    if(this.name.length < 1 || this.username.length < 1 || this.password.length < 1){
      alert("All fields are required.");
      return 
    } 
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
