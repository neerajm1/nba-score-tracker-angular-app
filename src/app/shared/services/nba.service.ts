import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { GameResult, GamesResultResponse, Response, Team } from '../models/nba.model';

@Injectable({
  providedIn: 'root'
})
export class NbaService {
  selectedTeams: Team[] = [];
  teamAddDeleteClick = new BehaviorSubject(false);
  teamGamesResults: GameResult[];

  constructor(private http: HttpClient) { }

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
      map(res => {
        res.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        return res;
      })
    );
  }

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
}
