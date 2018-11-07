import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NotifierModule } from "angular-notifier";


import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { IdUserService } from "./id-user.service";
import { ComponentLunchroomComponent } from './component-lunchroom/component-lunchroom.component';
import { ComponentLunchroomMenuComponent } from './component-lunchroom-menu/component-lunchroom-menu.component';
import { ComponentLunchroomPriceComponent } from './component-lunchroom-price/component-lunchroom-price.component';
import { ComponentLunchroomModalComponent } from './component-lunchroom-modal/component-lunchroom-modal.component';
import { ComponentCommentComponent } from './component-comment/component-comment.component';
import { ComponentAdminEditmenuComponent } from './component-admin-editmenu/component-admin-editmenu.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ComponentLunchroomComponent,
    ComponentLunchroomMenuComponent,
    ComponentLunchroomPriceComponent,
    ComponentLunchroomModalComponent,
    ComponentCommentComponent,
    ComponentAdminEditmenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NotifierModule,
  ],
  providers: [IdUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
