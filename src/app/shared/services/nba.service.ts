import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { GameResult, GamesResultResponse, Response, Team } from '../models/nba.model';

@Injectable({
  providedIn: 'root'
})
export class NbaService {
  // public properties
  allTeams: Team[];
  selectedTeams: Team[] = [];
  teamAddDeleteClick = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  // public methods
  getAllTeams(): Observable<Response<Team[]>> {
    const teamsApiUrl = 'https://free-nba.p.rapidapi.com/teams';
    return this.http.get<Response<Team[]>>(teamsApiUrl);
  }

  getTeamDetails(teamId: number): Observable<Team> {
    const teamsApiUrl = `https://free-nba.p.rapidapi.com/teams/${teamId}`;
    return this.http.get<Team>(teamsApiUrl);
  }

  getTeamGamesResults(teamId: number): Observable<GamesResultResponse> {
    const formattedDateString = this.getFormattedDateStringOfPast12Days();
    const url = `https://free-nba.p.rapidapi.com/games?page=0&${formattedDateString}&per_page=12&team_ids[]=${teamId}`;
    return this.http.get<GamesResultResponse>(url).pipe(
      map((res: GamesResultResponse) => {
        return this.getModifiedTeamGamesResults(res);
      })
    );
  }

  preparePast12DaysResults(selectedTeamId: number) {
    let totalPointsScored = 0;
    let totalPointsConceded = 0;
    this.selectedTeams.forEach(team => {
      if (selectedTeamId === team.id) {
        const totalGames = team.gamesResults.length;
        team.gamesResults.forEach(result => {
          if (result.home_team.id === team.id) {
            // if team plays home game
            totalPointsScored += result.home_team_score;
            totalPointsConceded += result.visitor_team_score;
            team.lastResults.push(result.home_team_score > result.visitor_team_score ? 1 : 0);
          } else if (result.visitor_team.id === team.id) {
            // if team plays away(visitor) game
            totalPointsScored += result.visitor_team_score;
            totalPointsConceded += result.home_team_score;
            team.lastResults.push(result.visitor_team_score > result.home_team_score ? 1 : 0);
          }
        });
        team.avgPointsScored = Math.floor(totalPointsScored / totalGames);
        team.avgPointsConceded = Math.floor(totalPointsConceded / totalGames);
      }
    });
  }

  // private methods
  private getFormattedDateStringOfPast12Days(): string {
    const today = new Date();
    let formattedDateString = '';
    for (let i = 0; i < 12; ++i) {
      today.setDate(today.getDate() - 1);
      const formattedDate = formatDate(today, 'yyyy-MM-dd', 'en');
      formattedDateString = `${formattedDateString}dates[]=${formattedDate}`;
      if (i !== 11) {
        formattedDateString = formattedDateString + '&';
      }
    }
    return formattedDateString;
  }

  private getModifiedTeamGamesResults(teamGamesResults: GamesResultResponse) {
    const modifiedResults = teamGamesResults;
    // remove games, which have score 0-0 (games not played yet)
    modifiedResults.data = teamGamesResults.data.filter(element => element.home_team_score !== 0 || element.visitor_team_score !== 0);
    // sort games on date
    modifiedResults.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return modifiedResults;
  }
}
