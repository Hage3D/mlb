// Cache for Japanese players data
let cachedData: { teams: string[], lastUpdated: number } | null = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

async function fetchJapanesePlayersFromWikipedia(): Promise<string[]> {
  try {
    // Use Wikipedia API to get the page content
    const response = await fetch(
      'https://ja.wikipedia.org/api/rest_v1/page/html/日本出身のメジャーリーグベースボール選手一覧'
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch Wikipedia data');
    }
    
    const html = await response.text();
    
    // Parse HTML to extract current MLB teams
    // This is a simplified approach - in practice, you'd want more robust parsing
    const teamPatterns = [
      /ロサンゼルス・エンゼルス/g,
      /シカゴ・カブス/g,
      /ボストン・レッドソックス/g,
      /セントルイス・カージナルス/g,
      /トロント・ブルージェイズ/g,
      /サンフランシスコ・ジャイアンツ/g,
      /ヒューストン・アストロズ/g,
      /シアトル・マリナーズ/g,
      /ニューヨーク・ヤンキース/g,
      /ロサンゼルス・ドジャース/g,
    ];
    
    const teamMapping: { [key: string]: string } = {
      'ロサンゼルス・エンゼルス': 'Los Angeles Angels',
      'シカゴ・カブス': 'Chicago Cubs',
      'ボストン・レッドソックス': 'Boston Red Sox',
      'セントルイス・カージナルス': 'St. Louis Cardinals',
      'トロント・ブルージェイズ': 'Toronto Blue Jays',
      'サンフランシスコ・ジャイアンツ': 'San Francisco Giants',
      'ヒューストン・アストロズ': 'Houston Astros',
      'シアトル・マリナーズ': 'Seattle Mariners',
      'ニューヨーク・ヤンキース': 'New York Yankees',
      'ロサンゼルス・ドジャース': 'Los Angeles Dodgers',
    };
    
    const foundTeams = new Set<string>();
    
    for (const [japanese, english] of Object.entries(teamMapping)) {
      if (html.includes(japanese)) {
        foundTeams.add(english);
      }
    }
    
    return Array.from(foundTeams);
  } catch (error) {
    console.error('Failed to fetch Japanese players data:', error);
    // Fallback to known teams
    return [
      'Los Angeles Angels', // Kikuchi
      'Chicago Cubs', // Suzuki Seiya
      'Boston Red Sox', // Yoshida Masataka
      'St. Louis Cardinals', // Nootbaar Lars
    ];
  }
}

export async function getJapanesePlayersTeams(): Promise<string[]> {
  // Check cache first
  if (cachedData && Date.now() - cachedData.lastUpdated < CACHE_DURATION) {
    return cachedData.teams;
  }
  
  // Fetch fresh data
  const teams = await fetchJapanesePlayersFromWikipedia();
  
  // Update cache
  cachedData = {
    teams,
    lastUpdated: Date.now()
  };
  
  return teams;
}