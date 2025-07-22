export interface MLBGame {
  status: { detailedState: string };
  teams: {
    home: { team: { name: string }; score?: number };
    away: { team: { name: string }; score?: number };
  };
  gameDate: string;
}

export interface MLBApiResponse {
  dates: Array<{
    date: string;
    games: MLBGame[];
  }>;
}

export interface FormattedGame {
  homeTeam: string;
  awayTeam: string;
  score: string;
  time: string;
  status: 'live' | 'finished' | 'upcoming';
  showYouTubeLink: boolean;
  gameDate: string;
}

export type GameStatus = 'live' | 'finished' | 'upcoming';

export interface TeamData {
  icon: string;
  abbreviation: string;
}