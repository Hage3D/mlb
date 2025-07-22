/**
 * Game sorting utilities
 * Handles all logic for sorting MLB games by priority and time
 */

import { FormattedGame } from '@/types/mlb';
import { getGamePriority, TeamPriority } from './team-priority';

export interface SortableGame extends FormattedGame {
  priority?: TeamPriority;
}

/**
 * Compares two time strings in HH:MM format
 * Returns negative if timeA is earlier, positive if later, 0 if equal
 */
function compareTimeStrings(timeA: string, timeB: string): number {
  // Handle empty times by putting them at the end
  if (!timeA && !timeB) return 0;
  if (!timeA) return 1;
  if (!timeB) return -1;
  
  return timeA.localeCompare(timeB);
}

/**
 * Assigns priority to games based on team involvement
 */
export function assignGamePriorities(games: FormattedGame[], japaneseTeams: string[]): SortableGame[] {
  return games.map(game => ({
    ...game,
    priority: getGamePriority(game.homeTeam, game.awayTeam, japaneseTeams),
  }));
}

/**
 * Sorts games by priority first, then by time within each priority group
 */
export function sortGamesByPriority(games: SortableGame[]): SortableGame[] {
  return games.sort((a, b) => {
    // Primary sort: by priority (lower number = higher priority)
    if (a.priority !== b.priority) {
      return (a.priority || TeamPriority.OTHER) - (b.priority || TeamPriority.OTHER);
    }
    
    // Secondary sort: by time within same priority
    return compareTimeStrings(a.time || '', b.time || '');
  });
}

/**
 * Main sorting function - combines priority assignment and sorting
 */
export function sortGames(games: FormattedGame[], japaneseTeams: string[]): FormattedGame[] {
  const gamesWithPriority = assignGamePriorities(games, japaneseTeams);
  const sortedGames = sortGamesByPriority(gamesWithPriority);
  
  // Remove priority field from final result
  return sortedGames.map(({ priority, ...game }) => game);
}