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
 * Extracts player's name from a description string.
 * Example: "Shohei Ohtani homers (26) on a fly ball..." -> "Shohei Ohtani"
 */
function extractPlayerNameFromDescription(description: string): string | null {
  // This regex is more specific to capture names, which may contain spaces.
  const match = description.match(/^(.+?)\s+homers/);
  return match ? match[1].trim() : null;
}

/**
 * Generates a concise Japanese summary for a finished game.
 */
function generateGameSummary(game: MLBGame): string | undefined {
  if (getGameStatus(game.status.detailedState) !== 'finished' || !game.liveData) {
    return undefined;
  }

  const { decisions, plays } = game.liveData;
  const summaryParts: string[] = [];

  const pitcherSummary: string[] = [];
  if (decisions?.winner?.fullName) pitcherSummary.push(`[勝] ${decisions.winner.fullName}`);
  if (decisions?.loser?.fullName) pitcherSummary.push(`[敗] ${decisions.loser.fullName}`);
  if (decisions?.save?.fullName) pitcherSummary.push(`[S] ${decisions.save.fullName}`);

  if (pitcherSummary.length > 0) {
    summaryParts.push(pitcherSummary.join(' '));
  }

  if (plays && plays.allPlays) {
    const homeRunPlays = plays.allPlays.filter(play => play.result.eventType === 'home_run');
    if (homeRunPlays.length > 0) {
      const homeRunPainters = homeRunPlays
        .map(play => extractPlayerNameFromDescription(play.result.description))
        .filter((name): name is string => name !== null);

      if (homeRunPainters.length > 0) {
        summaryParts.push(`本塁打: ${homeRunPainters.join(', ')}`);
      }
    }
  }

  return summaryParts.join(' / ') || undefined;
}


/**
 * Formats raw MLB game data for display
 */
export function formatGameData(game: MLBGame): FormattedGame {
  const status = getGameStatus(game.status.detailedState);
  const timeString = formatGameTimeToJst(game.gameDate);
  const summary = generateGameSummary(game);

  return {
    homeTeam: game.teams.home.team.name,
    awayTeam: game.teams.away.team.name,
    score: `${game.teams.away.score || 0} - ${game.teams.home.score || 0}`,
    time: timeString,
    status,
    showYouTubeLink: status === 'finished',
    gameDate: game.gameDate,
    summary,
  };
}