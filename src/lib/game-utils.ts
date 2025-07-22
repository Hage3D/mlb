import { MLBGame, FormattedGame, GameStatus } from '@/types/mlb';
import { formatGameTimeToJst } from './date-utils';

/**
 * Converts MLB API game status to our internal status
 */
export function getGameStatus(detailedState: string): GameStatus {
  if (detailedState === 'In Progress') return 'live';
  if (detailedState === 'Final' || detailedState === 'Game Over') return 'finished';
  return 'upcoming';
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

/**
 * Custom sorting logic for games
 */
export function getSortPriority(game: FormattedGame, japaneseTeams: string[]): number {
  const { homeTeam, awayTeam } = game;
  
  // Priority 1: Padres games
  if (homeTeam === 'San Diego Padres' || awayTeam === 'San Diego Padres') {
    return 1;
  }
  
  // Priority 2: Dodgers games
  if (homeTeam === 'Los Angeles Dodgers' || awayTeam === 'Los Angeles Dodgers') {
    return 2;
  }
  
  // Priority 3: Japanese players teams
  if (japaneseTeams.includes(homeTeam) || japaneseTeams.includes(awayTeam)) {
    return 3;
  }
  
  // Priority 4: All other games
  return 4;
}

/**
 * Sorts games according to priority and time
 */
export function sortGames(games: FormattedGame[], japaneseTeams: string[]): FormattedGame[] {
  return games.sort((a, b) => {
    const priorityA = getSortPriority(a, japaneseTeams);
    const priorityB = getSortPriority(b, japaneseTeams);
    
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    
    // Within same priority, sort by time
    return (a.time || '').localeCompare(b.time || '');
  });
}