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
    const today = new Date();
    let datesForUrl = '';
    for (let i = 0; i < 12; ++i) {
      today.setDate(today.getDate() - 1);
      const formattedDate = formatDate(today, 'yyyy-MM-dd', 'en');
      datesForUrl = `${datesForUrl}dates[]=${formattedDate}`;
      if (i !== 11) {
        datesForUrl = datesForUrl + '&';
      }
    }
    const url = `https://free-nba.p.rapidapi.com/games?page=0&${datesForUrl}&per_page=12&team_ids[]=${teamId}`;
    return this.http.get<GamesResultResponse>(url).pipe(
      map(res => {
        res.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        return res;
      })
    );
  }
}
