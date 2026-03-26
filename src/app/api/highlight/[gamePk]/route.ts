import { NextResponse } from 'next/server';

const MLB_API_BASE = 'https://statsapi.mlb.com/api/v1';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ gamePk: string }> }
) {
  const { gamePk } = await params;
  if (!gamePk) {
    return NextResponse.json({ error: 'gamePk is required' }, { status: 400 });
  }

  try {
    const res = await fetch(`${MLB_API_BASE}/game/${gamePk}/content`);
    if (!res.ok) {
      throw new Error('Failed to fetch from MLB API');
    }
    const data = await res.json();

    let videoUrl = null;

    // Try to find highlights
    if (data.highlights && data.highlights.highlights && data.highlights.highlights.items) {
      const items = data.highlights.highlights.items;

      // Look for a specific "Highlight" or generic recap
      const highlightItem = items.find((item: any) =>
        item.title?.toLowerCase().includes('highlight') ||
        item.description?.toLowerCase().includes('highlight')
      ) || items[0]; // Fallback to the first item

      if (highlightItem && highlightItem.playbacks) {
        // Find mp4Avc format which is standard video
        const playback = highlightItem.playbacks.find((pb: any) => pb.name === 'mp4Avc');
        if (playback && playback.url) {
          videoUrl = playback.url;
        } else if (highlightItem.playbacks.length > 0) {
          // Fallback to first playback if mp4Avc is not found
          videoUrl = highlightItem.playbacks[0].url;
        }
      }
    }

    if (!videoUrl) {
      return NextResponse.json({ error: 'No video URL found' }, { status: 404 });
    }

    return NextResponse.json({ url: videoUrl });

  } catch (error) {
    console.error('Error fetching highlights:', error);
    return NextResponse.json({ error: 'Failed to fetch highlights' }, { status: 500 });
  }
}
