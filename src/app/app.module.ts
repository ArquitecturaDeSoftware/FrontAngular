import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { IdUserService } from "./id-user.service";
import { LunchroomComponentComponent } from './lunchroom-component/lunchroom-component.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    LunchroomComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [IdUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
