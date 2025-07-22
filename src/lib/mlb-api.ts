import { MLBApiResponse } from '@/types/mlb';

/**
 * MLB API client functions
 */

const MLB_API_BASE = 'https://statsapi.mlb.com/api/v1';

/**
 * Fetches MLB games for a specific date
 */
export async function getMlbDataForDate(dateStr: string): Promise<MLBApiResponse['dates'][0] | null> {
  const res = await fetch(`${MLB_API_BASE}/schedule/games/?sportId=1&date=${dateStr}`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch data from MLB API');
  }

  const data: MLBApiResponse = await res.json();
  return data.dates?.[0] || null;
}

/**
 * Gets the latest US date that should have games
 * Converts current JST to appropriate US date
 */
export async function getLatestGameDate(): Promise<string> {
  // Get current JST date and convert to US date (previous day)
  const jstNow = new Date();
  const usDate = new Date(jstNow.getTime() - (24 * 60 * 60 * 1000));
  const usDateStr = usDate.toISOString().split('T')[0];
  
  try {
    const res = await fetch(`${MLB_API_BASE}/schedule/games/?sportId=1&date=${usDateStr}`);
    
    if (!res.ok) {
      return usDateStr;
    }

    const data: MLBApiResponse = await res.json();
    
    if (data.dates?.length > 0 && data.dates[0].games.length > 0) {
      return data.dates[0].date;
    }
    
    return usDateStr;
  } catch (error) {
    console.error('Failed to fetch latest game date:', error);
    return usDateStr;
  }
}