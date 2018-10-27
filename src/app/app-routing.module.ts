import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewHomeComponent} from './view-home/view-home.component'
import { ViewLunchroomsComponent } from './view-lunchrooms/view-lunchrooms.component'
import { ViewTicketComponent } from "./view-ticket/view-ticket.component";
import { ViewAdminComponent } from './view-admin/view-admin.component';
import { ViewCommentsComponent } from "./view-comments/view-comments.component";

const routes: Routes = [
  { path: '', component: ViewHomeComponent },
  { path: 'lunchrooms', component: ViewLunchroomsComponent },
  { path: 'tickets', component: ViewTicketComponent },
  { path: 'admin', component: ViewAdminComponent },
  { path: 'comments', component: ViewCommentsComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ViewCommentsComponent, ViewHomeComponent, ViewLunchroomsComponent, ViewTicketComponent, ViewAdminComponent]
