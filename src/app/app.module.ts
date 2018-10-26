import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { IdUserService } from "./id-user.service";
import { LunchroomComponentComponent } from './lunchroom-component/lunchroom-component.component';
import { MenuComponentComponent } from './menu-component/menu-component.component';
import { PriceTimeTicketInfoComponentComponent } from './price-time-ticket-info-component/price-time-ticket-info-component.component';
import { ModalLunchroomComponentComponent } from './modal-lunchroom-component/modal-lunchroom-component.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    LunchroomComponentComponent,
    MenuComponentComponent,
    PriceTimeTicketInfoComponentComponent,
    ModalLunchroomComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [IdUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
