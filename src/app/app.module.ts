import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamSelectComponent } from './team-select/team-select.component';
import { TeamResultsComponent } from './team-results/team-results.component';
import { SharedModule } from './shared/shared.module';
import { TeamGamesResultsComponent } from './team-games-results/team-games-results.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './app.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TeamSelectComponent,
    TeamResultsComponent,
    TeamGamesResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
