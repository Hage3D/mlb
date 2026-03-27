"use client";

import { getTeamData } from '@/lib/teams';
import { GameStatus } from '@/types/mlb';
import Image from 'next/image';
import { useState } from 'react';

interface GameCardProps {
  gamePk: number;
  homeTeam: string;
  awayTeam: string;
  score: string;
  time?: string;
  status: GameStatus;
  showYouTubeLink?: boolean;
  gameDate?: string;
}

export default function GameCard({ gamePk, homeTeam, awayTeam, score, time, status, showYouTubeLink = false, gameDate }: GameCardProps) {
  const homeTeamData = getTeamData(homeTeam);
  const awayTeamData = getTeamData(awayTeam);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleWatchHighlights = async () => {
    setIsModalOpen(true);
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/highlight/${gamePk}`);
      if (!res.ok) {
        throw new Error('Failed to fetch video');
      }
      const data = await res.json();
      setVideoUrl(data.url);
    } catch (err: any) {
      setError(err.message || 'Error fetching video');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVideoUrl(null);
    setError(null);
  };

  const statusInfo = {
    live: { text: 'Live', color: 'text-red-600' },
    finished: { text: '', color: 'text-gray-500' },
    upcoming: { text: '', color: 'text-blue-600' },
  };

  const generateYouTubeQuery = () => {
    const homeAbbr = homeTeamData?.abbreviation || homeTeam;
    const awayAbbr = awayTeamData?.abbreviation || awayTeam;
    
    // Format date to American format (Month Day, Year) - use actual US game date for search
    let dateString = '';
    if (gameDate) {
      const date = new Date(gameDate);
      // Use the actual game date (US time) for YouTube search, not the JST display date
      dateString = date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric',
        timeZone: 'America/New_York' // Ensure we get the correct US date
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
          <button
            onClick={handleWatchHighlights}
            className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            ハイライトを見る
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-4xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">{homeTeamData?.abbreviation || homeTeam} vs {awayTeamData?.abbreviation || awayTeam} - ハイライト</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 p-1"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-0 bg-black aspect-video flex items-center justify-center w-full">
              {isLoading && (
                <div className="text-white">読み込み中...</div>
              )}
              {error && (
                <div className="text-red-500 bg-white p-4 rounded">{error}</div>
              )}
              {videoUrl && !isLoading && !error && (
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                >
                  お使いのブラウザは動画タグをサポートしていません。
                </video>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}