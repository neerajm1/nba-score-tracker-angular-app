import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamTitleCardComponent } from './components/team-title-card/team-title-card.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    TeamTitleCardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [TeamTitleCardComponent]
})
export class SharedModule { }
