import GameCard from '@/components/GameCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

async function getMlbDataForDate(dateStr: string) {
  const res = await fetch(`https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&date=${dateStr}`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch data from MLB API');
  }

  const data = await res.json();
  return data.dates?.[0] || null;
}

interface MLBGame {
  status: { detailedState: string };
  teams: {
    home: { team: { name: string }; score?: number };
    away: { team: { name: string }; score?: number };
  };
  gameDate: string;
}

function formatGameData(game: MLBGame) {
  const status = game.status.detailedState;
  let gameStatus: 'live' | 'finished' | 'upcoming' = 'upcoming';
  if (status === 'In Progress') gameStatus = 'live';
  if (status === 'Final' || status === 'Game Over') gameStatus = 'finished';

  // Convert game time to JST - the API already provides UTC time, so we just format for JST timezone
  const gameDate = new Date(game.gameDate);
  const timeString = gameDate.toLocaleTimeString('ja-JP', { 
    timeZone: 'Asia/Tokyo',
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });

  return {
    homeTeam: game.teams.home.team.name,
    awayTeam: game.teams.away.team.name,
    score: `${game.teams.away.score || 0} - ${game.teams.home.score || 0}`,
    time: timeString,
    status: gameStatus,
    showYouTubeLink: gameStatus === 'finished',
    gameDate: game.gameDate,
  };
}

function getAdjacentDates(currentDate: string) {
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

export default async function DatePage({ params }: { params: { date: string } }) {
  const dateData = await getMlbDataForDate(params.date);
  const { prevDate, nextDate } = getAdjacentDates(params.date);

  if (!dateData || !dateData.games || dateData.games.length === 0) {
    // Still show navigation even if no games
    // Convert US date to JST date for display (add 1 day for most evening games)
    const usDateObj = new Date(params.date);
    const jstDateObj = new Date(usDateObj.getTime() + (24 * 60 * 60 * 1000)); // Add 1 day for JST display
    const dateString = `${jstDateObj.getFullYear()}.${String(jstDateObj.getMonth() + 1).padStart(2, '0')}.${String(jstDateObj.getDate()).padStart(2, '0')} ${jstDateObj.toLocaleDateString('en-US', { weekday: 'short' })}`;

    return (
      <div className="space-y-6">
        {/* Date Navigation */}
        <div className="flex justify-between items-center mb-8">
          <Link 
            href={`/date/${prevDate}`}
            className="flex items-center px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-gray-700 hover:text-blue-600"
          >
            <span className="mr-2">←</span>
            <span>前日</span>
          </Link>
          
          <h1 className="text-xl font-semibold text-gray-800 bg-white px-6 py-3 rounded-full shadow-md">
            {dateString}
          </h1>
          
          <Link 
            href={`/date/${nextDate}`}
            className="flex items-center px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-gray-700 hover:text-blue-600"
          >
            <span>翌日</span>
            <span className="ml-2">→</span>
          </Link>
        </div>

        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">この日は試合がありませんでした</p>
        </div>
      </div>
    );
  }

  const formattedGames = dateData.games.map(formatGameData);
  // Convert US date to JST date for display (add 1 day for most evening games)
  const usDateObj = new Date(dateData.date);
  const jstDateObj = new Date(usDateObj.getTime() + (24 * 60 * 60 * 1000)); // Add 1 day for JST display
  const dateString = `${jstDateObj.getFullYear()}.${String(jstDateObj.getMonth() + 1).padStart(2, '0')}.${String(jstDateObj.getDate()).padStart(2, '0')} ${jstDateObj.toLocaleDateString('en-US', { weekday: 'short' })}`;

  return (
    <div className="space-y-6">
      {/* Date Navigation */}
      <div className="flex justify-between items-center mb-8">
        <Link 
          href={`/date/${prevDate}`}
          className="flex items-center px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-gray-700 hover:text-blue-600"
        >
          <span className="mr-2">←</span>
          <span>前日</span>
        </Link>
        
        <h1 className="text-xl font-semibold text-gray-800 bg-white px-6 py-3 rounded-full shadow-md">
          {dateString}
        </h1>
        
        <Link 
          href={`/date/${nextDate}`}
          className="flex items-center px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-gray-700 hover:text-blue-600"
        >
          <span>翌日</span>
          <span className="ml-2">→</span>
        </Link>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formattedGames.map((game: any, index: number) => (
          <GameCard key={`${dateData.date}-${index}`} {...game} />
        ))}
      </div>
    </div>
  );
}