import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NotifierModule } from "angular-notifier";


import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { IdUserService } from "./id-user.service";
import { ComponentLunchroomComponent } from './component-lunchroom/component-lunchroom.component';
import { ComponentLunchroomMenuComponent } from './component-lunchroom-menu/component-lunchroom-menu.component';

import { ComponentLunchroomModalComponent } from './component-lunchroom-modal/component-lunchroom-modal.component';
import { ComponentCommentComponent } from './component-comment/component-comment.component';
import { ComponentAdminEditmenuComponent } from './component-admin-editmenu/component-admin-editmenu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from '../material-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material';
import { ComponentLunchroomModalTicketComponent } from './component-lunchroom-modal-ticket/component-lunchroom-modal-ticket.component';
import { ComponentLunchroomTicketComponent } from './component-lunchroom-ticket/component-lunchroom-ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ComponentLunchroomComponent,
    ComponentLunchroomMenuComponent,
    ComponentLunchroomModalComponent,
    ComponentCommentComponent,
    ComponentAdminEditmenuComponent,
    ComponentLunchroomModalTicketComponent,
    ComponentLunchroomTicketComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NotifierModule,
    BrowserAnimationsModule,
    FormsModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [IdUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

