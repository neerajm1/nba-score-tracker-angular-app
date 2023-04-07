import { Component } from '@angular/core';
import { Response, Team } from '../shared/models/nba.model';
import { NbaService } from '../shared/services/nba.service';

@Component({
  selector: 'app-team-select',
  templateUrl: './team-select.component.html',
  styleUrls: ['./team-select.component.scss']
})
export class TeamSelectComponent {
  teams: Team[];
  selectedTeam: Team;
  selectedTeamId: number;

  constructor(public nbaService: NbaService) { }

  ngOnInit() {
    this.nbaService.getAllTeams().subscribe(
      (data: Response<Team[]>) => {
        this.teams = data.data;
        this.selectedTeamId = this.teams[0].id;
      },
      (error) => {
        console.log({ error });
      }
    );
  }

  onSelectChange(event) {
    this.selectedTeamId = +event.target.value;
  }

  onTrackTeamClick() {
    this.selectedTeam = this.teams.find(team => team.id === this.selectedTeamId);
    if (!this.nbaService.selectedTeams.find(team => team.id === this.selectedTeamId)) {
      this.nbaService.selectedTeams.push({
        ...this.selectedTeam, lastResults: []
      });
      this.nbaService.getTeamGamesResults(this.selectedTeamId)
        .subscribe((data) => {
          this.nbaService.teamGamesResults = data.data;
          let totalPointsScored = 0;
          let totalPointsConceded = 0;
          const totalGames = this.nbaService.teamGamesResults.length;
          this.nbaService.selectedTeams.forEach(team => {
            if (this.selectedTeamId === team.id) {
              this.nbaService.teamGamesResults.forEach(result => {
                if (result.home_team.id === team.id) {
                  totalPointsScored += result.home_team_score;
                  totalPointsConceded += result.visitor_team_score;
                  team.lastResults.push(result.home_team_score > result.visitor_team_score ? 1 : 0);
                } else if (result.visitor_team.id === team.id) {
                  totalPointsScored += result.visitor_team_score;
                  totalPointsConceded += result.home_team_score;
                  team.lastResults.push(result.visitor_team_score > result.home_team_score ? 1 : 0);
                }
              });
              team.avgPointsScored = Math.floor(totalPointsScored / totalGames);
              team.avgPointsConceded = Math.floor(totalPointsConceded / totalGames);
            }
          });
        });
      this.nbaService.teamAddDeleteClick.next(true);
    }
  }
}
