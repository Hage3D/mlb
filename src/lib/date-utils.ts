/**
 * Date utility functions for MLB game scheduling
 * Handles conversion between US game dates and JST display dates
 */

/**
 * Converts JST date to US date (typically previous day)
 * Used for fetching games that correspond to a JST date
 */
export function jstDateToUsDate(jstDate: Date): string {
  const usDate = new Date(jstDate.getTime() - (24 * 60 * 60 * 1000));
  return usDate.toISOString().split('T')[0];
}

/**
 * Converts US game date to JST display date (typically next day)
 * Used for displaying dates in Japanese time zone
 */
export function usDateToJstDisplayDate(usDateString: string): string {
  const usDate = new Date(usDateString);
  const jstDate = new Date(usDate.getTime() + (24 * 60 * 60 * 1000));
  
  return `${jstDate.getFullYear()}.${String(jstDate.getMonth() + 1).padStart(2, '0')}.${String(jstDate.getDate()).padStart(2, '0')} ${jstDate.toLocaleDateString('en-US', { weekday: 'short' })}`;
}

/**
 * Gets adjacent dates for navigation
 */
export function getAdjacentDates(currentDate: string): { prevDate: string; nextDate: string } {
  const date = new Date(currentDate);
  const prevDate = new Date(date);
  const nextDate = new Date(date);
  
  prevDate.setDate(prevDate.getDate() - 1);
  nextDate.setDate(nextDate.getDate() + 1);
  
  return {
    prevDate: prevDate.toISOString().split('T')[0],
    nextDate: nextDate.toISOString().split('T')[0]
  };
}

/**
 * Formats game time to JST
 */
export function formatGameTimeToJst(gameDate: string): string {
  const date = new Date(gameDate);
  return date.toLocaleTimeString('ja-JP', { 
    timeZone: 'Asia/Tokyo',
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
}