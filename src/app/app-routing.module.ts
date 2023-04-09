import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamGamesResultsComponent } from './team-games-results/team-games-results.component';
import { TeamSelectComponent } from './team-select/team-select.component';

const routes: Routes = [
  { path: '', component: TeamSelectComponent },
  { path: 'results/:teamCode', component: TeamGamesResultsComponent },
  { path: '**', component: TeamSelectComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
