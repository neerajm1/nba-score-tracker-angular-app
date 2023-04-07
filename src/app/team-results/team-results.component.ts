import { Component } from '@angular/core';
import { GameResult, Team } from '../shared/models/nba.model';
import { NbaService } from '../shared/services/nba.service';

@Component({
  selector: 'app-team-results',
  templateUrl: './team-results.component.html',
  styleUrls: ['./team-results.component.scss']
})
export class TeamResultsComponent {
  selectedTeams: Team[] = [];
  teamGamesResults: GameResult[];

  constructor(private nbaService: NbaService) { }

  ngOnInit() {
    this.nbaService.teamAddDeleteClick.subscribe((clicked: boolean) => {
      this.selectedTeams = this.nbaService.selectedTeams;
    });
  }
}
