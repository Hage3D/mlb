/**
 * Team priority configuration for game sorting
 * Centralizes all team priority logic in one place
 */

export enum TeamPriority {
  PADRES = 1,
  DODGERS = 2,
  JAPANESE_PLAYERS = 3,
  OTHER = 4,
}

export interface PriorityConfig {
  level: TeamPriority;
  description: string;
  teams: string[];
}

/**
 * Fixed priority teams (highest priority teams)
 */
export const FIXED_PRIORITY_TEAMS: PriorityConfig[] = [
  {
    level: TeamPriority.PADRES,
    description: 'San Diego Padres games - highest priority',
    teams: ['San Diego Padres'],
  },
  {
    level: TeamPriority.DODGERS,
    description: 'Los Angeles Dodgers games - Japanese superstars (Ohtani, Yamamoto)',
    teams: ['Los Angeles Dodgers'],
  },
];

/**
 * Gets the priority level for a given team
 */
export function getTeamPriority(teamName: string, japaneseTeams: string[]): TeamPriority {
  // Check fixed priority teams first
  for (const config of FIXED_PRIORITY_TEAMS) {
    if (config.teams.includes(teamName)) {
      return config.level;
    }
  }
  
  // Check Japanese players teams
  if (japaneseTeams.includes(teamName)) {
    return TeamPriority.JAPANESE_PLAYERS;
  }
  
  // Default to other teams
  return TeamPriority.OTHER;
}

/**
 * Gets the priority for a game based on participating teams
 */
export function getGamePriority(homeTeam: string, awayTeam: string, japaneseTeams: string[]): TeamPriority {
  const homePriority = getTeamPriority(homeTeam, japaneseTeams);
  const awayPriority = getTeamPriority(awayTeam, japaneseTeams);
  
  // Return the highest priority (lowest number) of the two teams
  return Math.min(homePriority, awayPriority) as TeamPriority;
}