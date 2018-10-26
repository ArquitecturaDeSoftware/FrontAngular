import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeViewComponent } from './home-view/home-view.component'
import { LunchroomsViewComponent } from './lunchrooms-view/lunchrooms-view.component'
import { TicketViewComponent } from "./ticket-view/ticket-view.component";

const routes: Routes = [
  { path: '', component: HomeViewComponent },
  { path: 'lunchrooms', component: LunchroomsViewComponent },
  { path: 'tickets', component: TicketViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeViewComponent, LunchroomsViewComponent, TicketViewComponent]
