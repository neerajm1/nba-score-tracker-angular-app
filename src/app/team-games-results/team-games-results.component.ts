import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { GameResult, GamesResultResponse, Team } from '../shared/models/nba.model';
import { NbaService } from '../shared/services/nba.service';

@Component({
  selector: 'app-team-games-results',
  templateUrl: './team-games-results.component.html',
  styleUrls: ['./team-games-results.component.scss']
})
export class TeamGamesResultsComponent {
  teamData: Team;
  teamId: number;
  teamGamesResults: GameResult[];

  constructor(private route: ActivatedRoute, private nbaService: NbaService) { }

  ngOnInit() {
    this.teamId = this.route.snapshot.params['teamCode'];
    forkJoin([this.nbaService.getTeamDetails(this.teamId), this.nbaService.getTeamGamesResults(this.teamId)])
      .subscribe((data: [Team, GamesResultResponse]) => {
        this.teamData = data[0];
        this.teamGamesResults = this.nbaService.teamGamesResults = data[1].data;
      });
  }
}
