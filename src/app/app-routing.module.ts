import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CrudPageComponent } from './crud-page/crud-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'crud', component: CrudPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
