import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameResult, Team } from '../shared/models/nba.model';
import { NbaService } from '../shared/services/nba.service';

@Component({
  selector: 'app-team-games-results',
  templateUrl: './team-games-results.component.html',
  styleUrls: ['./team-games-results.component.scss']
})
export class TeamGamesResultsComponent {
  // public properties
  teamData: Team;
  teamGamesResults: GameResult[];

  constructor(private route: ActivatedRoute, private nbaService: NbaService, private router: Router) { }

  // public methods
  ngOnInit() {
    const teamCode = this.route.snapshot.params['teamCode'];
    this.teamData = this.nbaService.selectedTeams.find(team => team.abbreviation === teamCode);
    if (this.teamData) {
      this.teamGamesResults = this.teamData.gamesResults;
    } else {
      this.router.navigate(['']);
    }
  }
}
