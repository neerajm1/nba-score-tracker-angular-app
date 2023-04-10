import { Component } from '@angular/core';
import { Team } from '../shared/models/nba.model';
import { NbaService } from '../shared/services/nba.service';

@Component({
  selector: 'app-team-results',
  templateUrl: './team-results.component.html',
  styleUrls: ['./team-results.component.scss']
})
export class TeamResultsComponent {
  //public properties
  selectedTeams: Team[] = [];

  constructor(private nbaService: NbaService) { }

  // public methods
  ngOnInit() {
    this.nbaService.teamAddDeleteClick.subscribe((clicked: boolean) => {
      this.selectedTeams = clicked && this.nbaService.selectedTeams;
    });
  }
}
