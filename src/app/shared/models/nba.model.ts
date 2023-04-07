export interface Response<T> {
    data: T
}

export interface Team {
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    id: number;
    name: string;
    lastResults?: number[];
    avgPointsScored?: number;
    avgPointsConceded?: number;
}

export interface TeamData {
    data: Team[];
    meta: Meta;
}

interface Meta {
    total_pages: number;
    current_page: number;
    next_page: number;
    per_page: number;
    total_count: number;
}

export interface GamesResultResponse {
    data: GameResult[];
    meta: Meta;
}

export interface GameResult {
    id: number;
    date: string;
    home_team: Team;
    home_team_score: number;
    period: number;
    postseason: boolean;
    season: number;
    status: string;
    time: string;
    visitor_team: Team;
    visitor_team_score: number;
}
