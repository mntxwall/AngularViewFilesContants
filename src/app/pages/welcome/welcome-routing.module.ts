import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import {ShowComponent} from "../show/show.component";

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'show', component: ShowComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
