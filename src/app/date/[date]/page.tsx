import GameCard from '@/components/GameCard';
import { getTeamData } from '@/lib/teams';
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

  return {
    homeTeam: game.teams.home.team.name,
    awayTeam: game.teams.away.team.name,
    score: `${game.teams.away.score || 0} - ${game.teams.home.score || 0}`,
    date: new Date(game.gameDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    status: gameStatus,
    showYouTubeLink: gameStatus === 'finished',
  };
}

export default async function DatePage({ params }: { params: { date: string } }) {
  const dateData = await getMlbDataForDate(params.date);

  if (!dateData || !dateData.games || dateData.games.length === 0) {
    notFound();
  }

  const formattedGames = dateData.games.map(formatGameData);
  const dateString = new Date(dateData.date).toLocaleDateString('ja-JP', { 
    year: 'numeric',
    month: 'long', 
    day: 'numeric',
    weekday: 'short'
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 bg-white px-8 py-4 rounded-full shadow-md inline-block">
          {dateString}
        </h1>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formattedGames.map((game: any, index: number) => (
          <GameCard key={`${dateData.date}-${index}`} {...game} />
        ))}
      </div>
    </div>
  );
}