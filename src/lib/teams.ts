import { TeamData } from '@/types/mlb';

export const MLBTeams: { [key: string]: TeamData } = {
  'Arizona Diamondbacks': { abbreviation: 'ARI', icon: 'https://www.mlbstatic.com/team-logos/109.svg' },
  'Atlanta Braves': { abbreviation: 'ATL', icon: 'https://www.mlbstatic.com/team-logos/144.svg' },
  'Baltimore Orioles': { abbreviation: 'BAL', icon: 'https://www.mlbstatic.com/team-logos/110.svg' },
  'Boston Red Sox': { abbreviation: 'BOS', icon: 'https://www.mlbstatic.com/team-logos/111.svg' },
  'Chicago Cubs': { abbreviation: 'CHC', icon: 'https://www.mlbstatic.com/team-logos/112.svg' },
  'Chicago White Sox': { abbreviation: 'CWS', icon: 'https://www.mlbstatic.com/team-logos/145.svg' },
  'Cincinnati Reds': { abbreviation: 'CIN', icon: 'https://www.mlbstatic.com/team-logos/113.svg' },
  'Cleveland Guardians': { abbreviation: 'CLE', icon: 'https://www.mlbstatic.com/team-logos/114.svg' },
  'Colorado Rockies': { abbreviation: 'COL', icon: 'https://www.mlbstatic.com/team-logos/115.svg' },
  'Detroit Tigers': { abbreviation: 'DET', icon: 'https://www.mlbstatic.com/team-logos/116.svg' },
  'Houston Astros': { abbreviation: 'HOU', icon: 'https://www.mlbstatic.com/team-logos/117.svg' },
  'Kansas City Royals': { abbreviation: 'KC', icon: 'https://www.mlbstatic.com/team-logos/118.svg' },
  'Los Angeles Angels': { abbreviation: 'LAA', icon: 'https://www.mlbstatic.com/team-logos/108.svg' },
  'Los Angeles Dodgers': { abbreviation: 'LAD', icon: 'https://www.mlbstatic.com/team-logos/119.svg' },
  'Miami Marlins': { abbreviation: 'MIA', icon: 'https://www.mlbstatic.com/team-logos/146.svg' },
  'Milwaukee Brewers': { abbreviation: 'MIL', icon: 'https://www.mlbstatic.com/team-logos/158.svg' },
  'Minnesota Twins': { abbreviation: 'MIN', icon: 'https://www.mlbstatic.com/team-logos/142.svg' },
  'New York Mets': { abbreviation: 'NYM', icon: 'https://www.mlbstatic.com/team-logos/121.svg' },
  'New York Yankees': { abbreviation: 'NYY', icon: 'https://www.mlbstatic.com/team-logos/147.svg' },
  'Oakland Athletics': { abbreviation: 'OAK', icon: 'https://www.mlbstatic.com/team-logos/133.svg' },
  'Philadelphia Phillies': { abbreviation: 'PHI', icon: 'https://www.mlbstatic.com/team-logos/143.svg' },
  'Pittsburgh Pirates': { abbreviation: 'PIT', icon: 'https://www.mlbstatic.com/team-logos/134.svg' },
  'San Diego Padres': { abbreviation: 'SD', icon: 'https://www.mlbstatic.com/team-logos/135.svg' },
  'San Francisco Giants': { abbreviation: 'SF', icon: 'https://www.mlbstatic.com/team-logos/137.svg' },
  'Seattle Mariners': { abbreviation: 'SEA', icon: 'https://www.mlbstatic.com/team-logos/136.svg' },
  'St. Louis Cardinals': { abbreviation: 'STL', icon: 'https://www.mlbstatic.com/team-logos/138.svg' },
  'Tampa Bay Rays': { abbreviation: 'TB', icon: 'https://www.mlbstatic.com/team-logos/139.svg' },
  'Texas Rangers': { abbreviation: 'TEX', icon: 'https://www.mlbstatic.com/team-logos/140.svg' },
  'Toronto Blue Jays': { abbreviation: 'TOR', icon: 'https://www.mlbstatic.com/team-logos/141.svg' },
  'Washington Nationals': { abbreviation: 'WSH', icon: 'https://www.mlbstatic.com/team-logos/120.svg' },
};

export function getTeamData(teamName: string): TeamData | null {
  // Direct lookup first
  if (MLBTeams[teamName]) {
    return MLBTeams[teamName];
  }
  
  // Fallback for common variations
  const normalizedName = teamName.toLowerCase();
  const teamMap: { [key: string]: string } = {
    'angels': 'Los Angeles Angels',
    'astros': 'Houston Astros',
    'athletics': 'Oakland Athletics',
    'blue jays': 'Toronto Blue Jays',
    'braves': 'Atlanta Braves',
    'brewers': 'Milwaukee Brewers',
    'cardinals': 'St. Louis Cardinals',
    'cubs': 'Chicago Cubs',
    'diamondbacks': 'Arizona Diamondbacks',
    'dodgers': 'Los Angeles Dodgers',
    'giants': 'San Francisco Giants',
    'guardians': 'Cleveland Guardians',
    'indians': 'Cleveland Guardians', // Former name
    'marlins': 'Miami Marlins',
    'mariners': 'Seattle Mariners',
    'mets': 'New York Mets',
    'nationals': 'Washington Nationals',
    'orioles': 'Baltimore Orioles',
    'padres': 'San Diego Padres',
    'phillies': 'Philadelphia Phillies',
    'pirates': 'Pittsburgh Pirates',
    'rangers': 'Texas Rangers',
    'rays': 'Tampa Bay Rays',
    'red sox': 'Boston Red Sox',
    'reds': 'Cincinnati Reds',
    'rockies': 'Colorado Rockies',
    'royals': 'Kansas City Royals',
    'tigers': 'Detroit Tigers',
    'twins': 'Minnesota Twins',
    'white sox': 'Chicago White Sox',
    'yankees': 'New York Yankees',
  };
  
  const foundKey = Object.keys(teamMap).find(key => normalizedName.includes(key));
  if (foundKey && MLBTeams[teamMap[foundKey]]) {
    return MLBTeams[teamMap[foundKey]];
  }
  
  return null;
}