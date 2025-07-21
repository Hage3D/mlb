import GameCard from '@/components/GameCard';
import Link from 'next/link';

// Tells Next.js to revalidate this page every hour (3600 seconds)
export const revalidate = 3600;

async function getMlbData() {
  // Get games for the past week
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7);
  
  const startDateStr = startDate.toISOString().split('T')[0];
  const endDateStr = endDate.toISOString().split('T')[0];
  
  const res = await fetch(`https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=${startDateStr}&endDate=${endDateStr}`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch data from MLB API');
  }

  const data = await res.json();
  return data.dates || []; // Return all dates with games
}

// Define the MLB API game type
interface MLBGame {
  status: { detailedState: string };
  teams: {
    home: { team: { name: string }; score?: number };
    away: { team: { name: string }; score?: number };
  };
  gameDate: string;
}

// Helper to format the data for our GameCard component
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

export default async function ResultsPage() {
  const dates = await getMlbData();

  if (dates.length === 0) {
    return <p className="text-center text-gray-500">No games found for the past week.</p>;
  }

  return (
    <div className="space-y-12">
      {dates.map((dateData: any) => {
        const formattedGames = dateData.games.map(formatGameData);
        const dateString = new Date(dateData.date).toLocaleDateString('ja-JP', { 
          year: 'numeric',
          month: 'long', 
          day: 'numeric',
          weekday: 'short'
        });

        return (
          <div key={dateData.date} className="space-y-6">
            <div className="text-center">
              <Link href={`/date/${dateData.date}`}>
                <h2 className="text-2xl font-bold text-gray-800 bg-white px-6 py-3 rounded-full shadow-md inline-block hover:bg-gray-50 transition-colors cursor-pointer">
                  {dateString}
                </h2>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formattedGames.slice(0, 3).map((game: any, index: number) => (
                <GameCard key={`${dateData.date}-${index}`} {...game} />
              ))}
              {formattedGames.length > 3 && (
                <Link href={`/date/${dateData.date}`}>
                  <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                    <span className="text-gray-600 font-medium">
                      その他 {formattedGames.length - 3} 試合を表示
                    </span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}