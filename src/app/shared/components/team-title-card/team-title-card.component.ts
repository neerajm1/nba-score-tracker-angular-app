import { Component, Input } from '@angular/core';
import { Team } from '../../models/nba.model';
import { NbaService } from '../../services/nba.service';

@Component({
  selector: 'app-team-title-card',
  templateUrl: './team-title-card.component.html',
  styleUrls: ['./team-title-card.component.scss']
})
export class TeamTitleCardComponent {
  // public properties
  @Input() team: Team;
  @Input() showDeleteButton: boolean;

  constructor(private nbaService: NbaService) { }

  // public methods
  onDeleteClick(teamId: number) {
    this.nbaService.selectedTeams = this.nbaService.selectedTeams.filter(team => team.id !== teamId);
    this.nbaService.teamAddDeleteClick.next(true);
  }
}
