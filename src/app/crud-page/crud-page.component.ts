import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-page',
  templateUrl: './crud-page.component.html',
  styleUrls: ['./crud-page.component.css']
})
export class CrudPageComponent {

  dataSource: any = [];
  constructor(
    private http: HttpClient,
    private location: Location,
    private router: Router,) {
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

    this.http.get<any>(environment.apiUrl + '/users', { withCredentials: true }).subscribe(data => {
      this.dataSource = data;
      this.dataSource = this.dataSource.sort((a: any, b: any) => a.id - b.id )
    },
      error => {
        if(error["status"] == 401){
          this.router.navigate(['']);
        } else {
          alert("Trouble communicating with the server");
        }
      })

  }
  deleteOnClick(id: number) {
    this.http.delete<any>(environment.apiUrl + '/users/id/' + id,  { withCredentials: true }).subscribe(e => {})
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
    this.http.patch<any>(environment.apiUrl+'/users/update', body,  { withCredentials: true }).subscribe(
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
    this.http.post<any>(environment.apiUrl+'/users/create', body,  { withCredentials: true }).subscribe(
      data => {window.location.reload();},
      error => {alert("Something went wrong")});
      
  }
}
