/**
 * Application-wide constants
 * Centralizes all configuration values
 */

// Cache durations
export const CACHE_DURATION = {
  JAPANESE_PLAYERS: 24 * 60 * 60 * 1000, // 24 hours
  GAME_DATA: 3600, // 1 hour (for ISR)
} as const;

// Time formatting
export const TIME_FORMAT = {
  JST_LOCALE: 'ja-JP',
  US_LOCALE: 'en-US',
  TIME_ZONE_JST: 'Asia/Tokyo',
  TIME_ZONE_US: 'America/New_York',
} as const;

// MLB API endpoints
export const MLB_API = {
  BASE_URL: 'https://statsapi.mlb.com/api/v1',
  ENDPOINTS: {
    SCHEDULE: '/schedule/games',
    TEAMS: '/teams',
    ROSTER: '/teams/{teamId}/roster',
  },
  SPORT_ID: 1, // MLB
} as const;

// Game display
export const GAME_DISPLAY = {
  MAX_GAMES_PREVIEW: 3, // Max games to show on overview
  GRID_CLASSES: 'grid md:grid-cols-2 lg:grid-cols-3 gap-6',
} as const;