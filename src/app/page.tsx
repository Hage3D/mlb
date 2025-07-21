import { redirect } from 'next/navigation';

async function getLatestGameDate() {
  // Get games for the past week to find the latest date with games
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7);
  
  const startDateStr = startDate.toISOString().split('T')[0];
  const endDateStr = endDate.toISOString().split('T')[0];
  
  const res = await fetch(`https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=${startDateStr}&endDate=${endDateStr}`);
  
  if (!res.ok) {
    // Fallback to today's date if API fails
    return new Date().toISOString().split('T')[0];
  }

  const data = await res.json();
  const dates = data.dates || [];
  
  if (dates.length > 0) {
    // Return the most recent date with games
    return dates[dates.length - 1].date;
  }
  
  // Fallback to today's date
  return new Date().toISOString().split('T')[0];
}

export default async function HomePage() {
  const latestDate = await getLatestGameDate();
  redirect(`/date/${latestDate}`);
}