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

  
  ngOnInit(){
    var headers = { 'Authorization':  `Bearer ${this.jwt["jwt"]}`}
    
    this.http.get<any>(environment.apiUrl+'/users', {headers}).subscribe( data => {
      this.dataSource = data;
    },
    error => {
      alert("Trouble communicating with the server");
    })
  }
}
