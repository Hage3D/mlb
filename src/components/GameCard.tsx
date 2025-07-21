import { getTeamData } from '@/lib/teams';
import Image from 'next/image';

interface GameCardProps {
  homeTeam: string;
  awayTeam: string;
  score: string;
  time?: string;
  status: 'live' | 'finished' | 'upcoming';
  showYouTubeLink?: boolean;
  gameDate?: string;
}

export default function GameCard({ homeTeam, awayTeam, score, time, status, showYouTubeLink = false, gameDate }: GameCardProps) {
  const homeTeamData = getTeamData(homeTeam);
  const awayTeamData = getTeamData(awayTeam);

  const statusInfo = {
    live: { text: 'Live', color: 'text-red-600' },
    finished: { text: '', color: 'text-gray-500' },
    upcoming: { text: '', color: 'text-blue-600' },
  };

  const generateYouTubeQuery = () => {
    const homeAbbr = homeTeamData?.abbreviation || homeTeam;
    const awayAbbr = awayTeamData?.abbreviation || awayTeam;
    
    // Format date to American format (Month Day, Year) - use original game date from API (US time)
    let dateString = '';
    if (gameDate) {
      const date = new Date(gameDate);
      dateString = date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric',
        timeZone: 'America/New_York' // Use US Eastern time for consistent US date
      });
    }
    
    return dateString 
      ? `${homeAbbr} vs ${awayAbbr} MLB highlights ${dateString}`
      : `${homeAbbr} vs ${awayAbbr} MLB highlights`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 transition-shadow hover:shadow-md">
      {/* Game Status */}
      {statusInfo[status].text && (
        <div className="mb-4">
          <p className={`text-sm font-bold ${statusInfo[status].color}`}>{statusInfo[status].text}</p>
        </div>
      )}

      {/* Teams and Score/Time Layout */}
      <div className="flex items-center justify-between mb-3">
        {/* Away Team */}
        <div className="flex flex-col items-center space-y-2 flex-1">
          {awayTeamData?.icon ? (
            <Image src={awayTeamData.icon} alt={awayTeamData.abbreviation} width={40} height={40} />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">{awayTeam.slice(0, 3).toUpperCase()}</span>
            </div>
          )}
          <span className="font-semibold text-xs text-gray-800 text-center leading-tight">
            {awayTeamData?.abbreviation || awayTeam}
          </span>
        </div>

        {/* Score or Game Time */}
        <div className="flex-1 text-center px-2">
          {status === 'upcoming' ? (
            <div>
              {time && (
                <p className="text-base font-semibold text-gray-800">{time}</p>
              )}
            </div>
          ) : (
            <p style={{ fontSize: '2rem' }} className="font-bold text-gray-800 leading-none">{score}</p>
          )}
        </div>

        {/* Home Team */}
        <div className="flex flex-col items-center space-y-2 flex-1">
          {homeTeamData?.icon ? (
            <Image src={homeTeamData.icon} alt={homeTeamData.abbreviation} width={40} height={40} />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">{homeTeam.slice(0, 3).toUpperCase()}</span>
            </div>
          )}
          <span className="font-semibold text-xs text-gray-800 text-center leading-tight">
            {homeTeamData?.abbreviation || homeTeam}
          </span>
        </div>
      </div>

      {/* YouTube Link */}
      {showYouTubeLink && status === 'finished' && (
        <div className="mt-6 text-center">
          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(generateYouTubeQuery())}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            ハイライトを見る
          </a>
        </div>
      )}
    </div>
  );
}