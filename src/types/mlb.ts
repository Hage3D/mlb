export interface Player {
  id: number;
  fullName: string;
  link: string;
}

export interface Decisions {
  winner?: Player;
  loser?: Player;
  save?: Player;
}

export interface PlayEvent {
  details: {
    description?: string;
    event?: string;
    eventType?: string;
  };
}

export interface Play {
  result: {
    eventType: string;
    description: string;
  };
  about: {
    inning: number;
  };
  playEvents: PlayEvent[];
}

export interface GameLiveData {
  decisions?: Decisions;
  plays?: {
    allPlays: Play[];
  };
}

export interface MLBGame {
  gamePk: number;
  status: { detailedState: string };
  teams: {
    home: { team: { name: string }; score?: number };
    away: { team: { name: string }; score?: number };
  };
  gameDate: string;
  decisions?: Decisions;
  content?: {
    media?: {
      epg?: {
        title: string;
        items: {
          type: string;
          playbacks?: {
            url: string;
          }[];
        }[];
      }[];
    };
  };
  linescore: {
    teams: {
      home: { runs: number };
      away: { runs: number };
    };
    currentInning: number;
    inningState: string;
  };
}

export interface MLBApiResponse {
  dates: Array<{
    date: string;
    games: MLBGame[];
  }>;
}

export interface FormattedGame {
  homeTeam: string;
  awayTeam:string;
  score: string;
  time?: string;
  status: GameStatus;
  showYouTubeLink?: boolean;
  gameDate?: string;
  summary?: string;
  highlightUrl?: string;
}

export type GameStatus = 'live' | 'finished' | 'upcoming';

export interface TeamData {
  icon: string;
  abbreviation: string;
}