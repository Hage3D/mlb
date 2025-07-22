import GameCard from '@/components/GameCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getJapanesePlayersTeams } from '@/lib/japanese-players';
import { getMlbDataForDate } from '@/lib/mlb-api';
import { formatGameData, sortGames } from '@/lib/game-utils';
import { getAdjacentDates, usDateToJstDisplayDate } from '@/lib/date-utils';

export const revalidate = 3600;

export default async function DatePage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  const dateData = await getMlbDataForDate(date);
  const { prevDate, nextDate } = getAdjacentDates(date);
  
  // Get current Japanese players teams dynamically
  const japaneseTeams = await getJapanesePlayersTeams();

  if (!dateData || !dateData.games || dateData.games.length === 0) {
    const dateString = usDateToJstDisplayDate(date);

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
  const sortedGames = sortGames(formattedGames, japaneseTeams);
  const dateString = usDateToJstDisplayDate(dateData.date);

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
        {sortedGames.map((game: any, index: number) => (
          <GameCard key={`${dateData.date}-${index}`} {...game} />
        ))}
      </div>
    </div>
  );
}