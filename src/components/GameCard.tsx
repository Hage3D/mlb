import { getTeamData } from '@/lib/teams';
import { GameStatus } from '@/types/mlb';
import Image from 'next/image';

interface GameCardProps {
  homeTeam: string;
  awayTeam: string;
  score: string;
  time?: string;
  status: GameStatus;
  showYouTubeLink?: boolean;
  gameDate?: string;
  summary?: string;
}

export default function GameCard({ homeTeam, awayTeam, score, time, status, showYouTubeLink = false, gameDate, summary }: GameCardProps) {
  const homeTeamData = getTeamData(homeTeam);
  const awayTeamData = getTeamData(awayTeam);

  const statusInfo = {
    live: { text: 'Live', color: 'text-red-600' },
    finished: { text: '', color: 'text-gray-500' },
    upcoming: { text: '', color: 'text-blue-600' },
  };

  const generateMlbVideoSearchQuery = () => {
    // Search query for mlb.com/video is simpler, just team names are effective
    const homeName = homeTeamData?.abbreviation || homeTeam;
    const awayName = awayTeamData?.abbreviation || awayTeam;
    return `${awayName} ${homeName}`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 transition-shadow hover:shadow-md flex flex-col justify-between">
      <div>
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

        {/* Game Summary */}
        {summary && status === 'finished' && (
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-600">{summary}</p>
          </div>
        )}
      </div>

      {/* Highlight Link */}
      {showYouTubeLink && status === 'finished' && (
        <div className="mt-6 text-center">
          <a
            href={`https://www.mlb.com/video/search?q=${encodeURIComponent(generateMlbVideoSearchQuery())}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 text-sm font-medium text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-colors"
          >
            MLB公式ハイライト
          </a>
        </div>
      )}
    </div>
  );
}