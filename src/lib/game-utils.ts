import { MLBGame, FormattedGame, GameStatus } from '@/types/mlb';
import { formatGameTimeToJst } from './date-utils';

/**
 * Game status mapping from MLB API to internal format
 */
const GAME_STATUS_MAP: Record<string, GameStatus> = {
  'In Progress': 'live',
  'Final': 'finished',
  'Game Over': 'finished',
} as const;

/**
 * Converts MLB API game status to our internal status
 */
export function getGameStatus(detailedState: string): GameStatus {
  return GAME_STATUS_MAP[detailedState] || 'upcoming';
}

/**
 * Formats raw MLB game data for display
 */
export function formatGameData(game: MLBGame): FormattedGame {
  const status = getGameStatus(game.status.detailedState);
  const timeString = formatGameTimeToJst(game.gameDate);

  return {
    homeTeam: game.teams.home.team.name,
    awayTeam: game.teams.away.team.name,
    score: `${game.teams.away.score || 0} - ${game.teams.home.score || 0}`,
    time: timeString,
    status,
    showYouTubeLink: status === 'finished',
    gameDate: game.gameDate,
  };
}