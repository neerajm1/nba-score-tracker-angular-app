import { Component } from '@angular/core';
import { Response, Team } from '../shared/models/nba.model';
import { NbaService } from '../shared/services/nba.service';

@Component({
  selector: 'app-team-select',
  templateUrl: './team-select.component.html',
  styleUrls: ['./team-select.component.scss']
})
export class TeamSelectComponent {
  // public properties
  teams: Team[];

  // private fields
  private selectedTeamId: number;

  constructor(public nbaService: NbaService) { }

  // public methods
  ngOnInit() {
    this.nbaService.getAllTeams().subscribe(
      (data: Response<Team[]>) => {
        this.teams = data.data;
        // auto select 1st team in the dropdown list
        this.selectedTeamId = this.teams[0].id;
      }
    );
  }

  onSelectChange(event: Event) {
    this.selectedTeamId = +(event.target as HTMLInputElement).value;
  }

  onTrackTeamClick() {
    const selectedTeam = this.teams.find(team => team.id === this.selectedTeamId);
    if (!this.nbaService.selectedTeams.find(team => team.id === this.selectedTeamId)) {
      this.nbaService.selectedTeams.push({
        ...selectedTeam, lastResults: []
      });
      this.nbaService.getTeamGamesResults(this.selectedTeamId)
        .subscribe((data) => {
          this.nbaService.selectedTeams.forEach(team => {
            if (team.id === this.selectedTeamId) {
              team.gamesResults = data.data
            }
          })
          this.nbaService.preparePast12DaysResults(this.selectedTeamId);
        });
      this.nbaService.teamAddDeleteClick.next(true);
    }
  }
}
