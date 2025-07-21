import { getTeamData } from '@/lib/teams';
import Image from 'next/image';

interface GameCardProps {
  homeTeam: string;
  awayTeam: string;
  score: string;
  date: string;
  status: 'live' | 'finished' | 'upcoming';
  showYouTubeLink?: boolean;
}

export default function GameCard({ homeTeam, awayTeam, score, date, status, showYouTubeLink = false }: GameCardProps) {
  const homeTeamData = getTeamData(homeTeam);
  const awayTeamData = getTeamData(awayTeam);

  const statusInfo = {
    live: { text: 'Live', color: 'text-red-600' },
    finished: { text: 'Finished', color: 'text-gray-500' },
    upcoming: { text: 'Upcoming', color: 'text-blue-600' },
  };

  const generateYouTubeQuery = () => {
    const homeAbbr = homeTeamData?.abbreviation || homeTeam;
    const awayAbbr = awayTeamData?.abbreviation || awayTeam;
    return `${homeAbbr} vs ${awayAbbr} MLB highlights`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 transition-shadow hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className={`text-sm font-bold ${statusInfo[status].color}`}>{statusInfo[status].text}</p>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {awayTeamData?.icon ? (
            <Image src={awayTeamData.icon} alt={awayTeamData.abbreviation} width={40} height={40} />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">{awayTeam.slice(0, 3).toUpperCase()}</span>
            </div>
          )}
          <span className="font-semibold text-lg text-gray-800">{awayTeamData?.abbreviation || awayTeam}</span>
        </div>

        <div className="text-center">
          <p className="text-3xl font-bold text-gray-800">{score}</p>
        </div>

        <div className="flex items-center space-x-4">
          <span className="font-semibold text-lg text-gray-800">{homeTeamData?.abbreviation || homeTeam}</span>
          {homeTeamData?.icon ? (
            <Image src={homeTeamData.icon} alt={homeTeamData.abbreviation} width={40} height={40} />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">{homeTeam.slice(0, 3).toUpperCase()}</span>
            </div>
          )}
        </div>
      </div>

      {showYouTubeLink && status === 'finished' && (
        <div className="mt-6 text-center">
          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(generateYouTubeQuery())}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Watch Highlights
          </a>
        </div>
      )}
    </div>
  );
}